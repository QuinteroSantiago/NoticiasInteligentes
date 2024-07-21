import React, { useState, useEffect } from 'react';
import newsData from '../data/news_articles';
import NewsItem from './NewsItem';

function NewsFeed() {
   const [filter, setFilter] = useState('all');

   const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
   };

   const [filteredNewsData, setFilteredNewsData] = useState(newsData);

   useEffect(() => {
      const newData = newsData.filter(newsItem => {
         if (filter === 'positive') return newsItem.sentiment_score >= -0.1;
         if (filter === 'negative') return newsItem.sentiment_score < 0;
         return true;
      }).sort((a, b) => {
         return new Date(b.date) - new Date(a.date);
      });
      setFilteredNewsData(newData);
   }, [filter]);

   return (
      <div className="flex flex-col items-center justify-center px-10">
         <div className="mb-4">
            <button onClick={() => handleFilterChange('all')} className="mx-2 px-4 py-2 bg-gray-200 rounded">Todas las noticias</button>
            <button onClick={() => handleFilterChange('positive')} className="mx-2 px-4 py-2 bg-green-200 rounded">Noticias positivas</button>
            <button onClick={() => handleFilterChange('negative')} className="mx-2 px-4 py-2 bg-red-200 rounded">Noticias negativas</button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredNewsData.map((newsItem, index) => (
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
      </div>
   );
}

export default NewsFeed;
