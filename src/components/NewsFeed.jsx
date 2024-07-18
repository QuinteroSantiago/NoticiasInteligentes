import React from 'react';
// import newsData from '../data/newsData';
import newsData from '../data/pythonNewsData';
import NewsItem from './NewsItem';

function NewsFeed() {
   return (
      <div className="flex flex-col md:flex-row items-center justify-center pr-10 pl-10">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsData.map(project => (
               <NewsItem 
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
   )
}

export default NewsFeed;
