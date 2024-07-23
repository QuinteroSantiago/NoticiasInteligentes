import React, { useState, useEffect } from 'react';
import newsData from '../data/news_articles';
import NewsItem from './NewsItem';
import NewsControls from './NewsControls';

function NewsFeed() {
   const [filter, setFilter] = useState('all');
   const [sortMethod, setSortMethod] = useState('date');
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
            filteredData.sort((a, b) => a.title.localeCompare(b.title));
            break;
      }

      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
      setPaginatedData(paginatedItems);
      setNumPages(Math.ceil(filteredData.length / itemsPerPage));
   }, [filter, sortMethod, currentPage, itemsPerPage]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   const handleItemsPerPageChange = (event) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1); // Reset to first page with new item count
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
         <div className="flex items-center justify-center my-4 space-x-1">
            <button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
            >
               Previous
            </button>
            {Array.from({ length: numPages }, (_, i) => i + 1).map(page => (
               <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={page === currentPage}
                  className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-500 text-blue-700'}`}
               >
                  {page}
               </button>
            ))}
            <button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === numPages}
               className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
            >
               Next
            </button>
         </div>
         <div>
            <select
               onChange={handleItemsPerPageChange}
               value={itemsPerPage}
               className="px-4 py-2 rounded bg-blue-200 hover:bg-blue-400 cursor-pointer"
            >
               <option value="10">10 items per page</option>
               <option value="25">25 items per page</option>
               <option value="50">50 items per page</option>
               <option value="100">100 items per page</option>
            </select>
         </div>
      </div>
   );
}

export default NewsFeed;
