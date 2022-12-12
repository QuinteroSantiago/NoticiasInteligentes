import React from 'react';
import newsData from '../data/newsData';
import NewsItem from './NewsItem';

function NewsFeed() {
   return (
      <div className="flex flex-col md:flex-row items-center justify-center">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsData.map(project => (
               <NewsItem 
                  imgUrl={project.imgUrl}
                  title={project.title}
                  stack={project.stack}
                  link={project.link}
               />
            ))}
         </div>
      </div>
   )
}

export default NewsFeed;
