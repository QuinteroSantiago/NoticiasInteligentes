import React, { useState, useEffect } from 'react';
import newsData from '../data/news_articles';
import NewsItem from './NewsItem';
import NewsControls from './NewsControls';

function NewsFeed() {
   const [filter, setFilter] = useState('all');
   const [sortMethod, setSortMethod] = useState('date');
   const [filteredAndSortedNewsData, setFilteredAndSortedNewsData] = useState(newsData);

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
         default:
            break;
      }

      setFilteredAndSortedNewsData(filteredData);
   }, [filter, sortMethod]);

   return (
      <div className="flex flex-col items-center justify-center px-10">
         <NewsControls filter={filter} setFilter={setFilter} sortMethod={sortMethod} setSortMethod={setSortMethod} />
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAndSortedNewsData.map((newsItem, index) => (
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
