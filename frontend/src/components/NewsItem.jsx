import React from 'react';

function NewsItem({ title, imgUrl, tags, link, date }) {
   return (
      <a 
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="border-2 border-stone-900 dark:border-black rounded-md overflow-hidden"
      >
         <div class="relative">
            <img
               src={imgUrl}
               alt={title}
               className="w-full h-36 md:h-48 object-cover cursor-pointer"
            />
            <p className="absolute text-s top-2 right-2 text-white">
               <span className="inline-block px-1 border-2 dark:border-black bg-stone-800 opacity-75 rounded-lg">
                  {date}
               </span>
            </p>
         </div>
         <div className="w-full p-2">
            <h3 className="text-lg md:text-xl dark:text-black mb-2 md:mb-3 font-semibold">{title}</h3>
            <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm dark:text-black">
               {tags.map(item => (
                  <span className="inline-block px-2 py-1 border-2 border-stone-900 dark:border-black rounded-md">
                     {item}
                  </span>
               ))}
            </p>
         </div>
      </a>
   )
}

export default NewsItem;