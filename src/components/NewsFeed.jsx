import React, { useState, useEffect } from 'react';
import newsData from '../data/news_articles';
import NewsItem from './NewsItem';
import NewsControls from './NewsControls';
import Pagination from './Pagination';

function NewsFeed() {
   const [filter, setFilter] = useState(localStorage.getItem('newsFilter') || 'all');
   const [sortMethod, setSortMethod] = useState(localStorage.getItem('newsSortMethod') || 'date');
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(50);
   const [paginatedData, setPaginatedData] = useState([]);
   const [numPages, setNumPages] = useState(0);

   useEffect(() => {
      let filteredData = newsData.filter(newsItem => {
         if (filter === 'positive') return newsItem.sentiment_score >= 0;
         if (filter === 'negative') return newsItem.sentiment_score < 0;
         return true;
      });

      switch (sortMethod) {
         case 'most_positive':
            filteredData.sort((a, b) => b.sentiment_score - a.sentiment_score);
            break;
         case 'most_negative':
            filteredData.sort((a, b) => a.sentiment_score - b.sentiment_score);
            break;
         case 'date':
            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
         case 'alphabetical':
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
   }, [filter, sortMethod, currentPage, itemsPerPage]);

   useEffect(() => {
      localStorage.setItem('newsFilter', filter);
      localStorage.setItem('newsSortMethod', sortMethod);
   }, [filter, sortMethod]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   const handleItemsPerPageChange = (event) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
   };

   return (
      <div className="flex flex-col items-center justify-center px-10">
         <NewsControls filter={filter} setFilter={setFilter} sortMethod={sortMethod} setSortMethod={setSortMethod} />
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedData.map((newsItem, index) => (
               <NewsItem
                  key={`${newsItem.link}-${index}`}
                  imgUrl={newsItem.image_url}
                  title={newsItem.title}
                  tags={newsItem.tags}
                  link={newsItem.link}
                  date={newsItem.date}
                  sentimentScore={newsItem.sentiment_score} />
            ))
            }
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
