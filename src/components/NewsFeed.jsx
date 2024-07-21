import React from 'react';
import newsData from '../data/pythonNewsData';
import NewsItem from './NewsItem';

function NewsFeed() {
   return (
      <div className="flex flex-col items-center justify-center px-10">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newsData.map((project) => (
               <NewsItem
                  key={project.link}
                  imgUrl={project.image_url}
                  title={project.title}
                  tags={project.keywords}
                  link={project.link}
                  date={project.pubDate}
                  sentimentScore={project.sentiment_score}
               />
            ))}
         </div>
      </div>
   );
}

export default NewsFeed;
