import React, {useState, useEffect} from 'react';
import { getNewsArticles } from '../services/NewsArticlesService'
import NewsItem from './NewsItem';

function NewsFeed() {
   const [newsData, updateNews] = useState();

   useEffect(() => {
      const getData = async () => {
         try {
            const { data } = await getNewsArticles()
            const processedData = Object.keys(data).map((key) => [Number(key), data[key]]);
            updateNews(processedData);
         } catch (exc) {
            console.log(exc.message);
         }
      }
      getData();
   }, [])   

   return (
      <div className="flex flex-col md:flex-row items-center justify-center pr-10 pl-10">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsData?.map(newsArticle => {
               return <NewsItem
                  key={newsArticle.at(0)}
                  imgUrl={newsArticle.at(1).imgUrl}
                  title={newsArticle.at(1).title}
                  tags={newsArticle.at(1).tags}
                  link={newsArticle.at(1).link} 
                  date={newsArticle.at(1).date}
                  sentimentScore={newsArticle.at(1).sentiment_score}
                  />
               })}
         </div>
      </div>
   )
}

export default NewsFeed;
