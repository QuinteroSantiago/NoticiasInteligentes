// NewsFeed.jsx
import React, { useEffect, useState } from 'react';
import { useNewsState } from '../StateProvider';
import NewsItem from './NewsItem';
import NewsControls from './NewsControls';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { FILTERS, SORT_METHODS } from '../constants';

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
                .replace(/ñ/g, 'n') // Replace 'ñ' with 'n'
                .toLowerCase(); // Convert text to lower case
}

function NewsFeed() {
   const {
      filter,
      setFilter,
      sortMethod,
      setSortMethod,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
      searchTerm,
      setSearchTerm,
   } = useNewsState();

   const [newsData, setNewsData] = useState([]);
   const [paginatedData, setPaginatedData] = useState([]);
   const [numPages, setNumPages] = useState(0);

   useEffect(() => {
      // Fetch the news data from the dist/data directory
      fetch('/data/news_articles.json')
         .then(response => response.json())
         .then(data => setNewsData(data))
         .catch(error => console.error('Error loading news data:', error));
    }, []);

   useEffect(() => {
        let filteredData = newsData.filter(newsItem => {
            const matchesFilter = filter === FILTERS.ALL ||
                                (filter === FILTERS.POSITIVE && newsItem.sentiment_score >= 0) ||
                                (filter === FILTERS.NEGATIVE && newsItem.sentiment_score < 0);
            const matchesSearch = normalizeText(newsItem.title).includes(normalizeText(searchTerm));
            return matchesFilter && matchesSearch;
        });

      switch (sortMethod) {
         case SORT_METHODS.MOST_POSITIVE:
            filteredData.sort((a, b) => b.sentiment_score - a.sentiment_score);
            break;
         case SORT_METHODS.MOST_NEGATIVE:
            filteredData.sort((a, b) => a.sentiment_score - b.sentiment_score);
            break;
         case SORT_METHODS.DATE:
            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
         case SORT_METHODS.ALPHABETICAL:
            filteredData.sort((a, b) => {
               const titleA = a.title.replace(/^[^A-Za-z]+/, '');
               const titleB = b.title.replace(/^[^A-Za-z]+/, '');
               return titleA.localeCompare(titleB);
            });
            break;
      }

      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
      setPaginatedData(paginatedItems);
      setNumPages(Math.ceil(filteredData.length / itemsPerPage));
   }, [filter, sortMethod, currentPage, itemsPerPage, searchTerm]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   const handleItemsPerPageChange = (event) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
   };

   return (
      <div className="flex flex-col items-center justify-center px-10">
         <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
         <NewsControls 
            filter={filter} 
            setFilter={setFilter} 
            sortMethod={sortMethod} 
            setSortMethod={setSortMethod} 
         />
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedData.map((newsItem, index) => (
               <NewsItem
                  key={`${newsItem.link}-${index}`}
                  imgUrl={newsItem.image_url}
                  title={newsItem.title}
                  tags={newsItem.tags}
                  link={newsItem.link}
                  date={newsItem.date}
                  sentimentScore={newsItem.sentiment_score} 
               />
            ))}
         </div>
         <Pagination
            currentPage={currentPage}
            numPages={numPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
         />
      </div>
   );
}

export default NewsFeed;