import { useState, useEffect } from 'react';

function NewsItem({ title, imgUrl, tags, link, date, sentimentScore }) {
   const [borderColor, setBorderColor] = useState('border-red-500');
   const [imageUrl, setImageUrl] = useState('/assets/placeholder-for-na.png');

   useEffect(() => {
      if (sentimentScore >= 0.2) {
         setBorderColor('border-green-500');
      } else if (sentimentScore >= 0) {
         setBorderColor('border-stone-900');
      }
   }, [sentimentScore]);

   useEffect(() => {
      if (imgUrl) {
         setImageUrl(imgUrl);
      }
   }, [imgUrl]);

   return (
      <a
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className={`border-4 ${borderColor} rounded-md overflow-hidden w-full md:w-60`}
      >
         <div className="relative">
            <img
               src={imageUrl}
               alt={title}
               className="w-full h-36 md:h-48 object-cover cursor-pointer"
            />
            <p className="absolute top-2 right-2 text-white text-sm">
               <span className="px-2 py-1 border-2 bg-stone-800 opacity-75 rounded-lg">
                  {date}
               </span>
            </p>
         </div>
         <div className="p-2">
            <h3 className="text-lg md:text-xl mb-2 font-semibold">{title}</h3>
            <div className="flex flex-wrap gap-2">
               {tags.map((item, index) => (
                  <span
                     key={index}
                     className="px-2 py-1 border-2 border-stone-900 rounded-md text-xs md:text-sm"
                  >
                     {item}
                  </span>
               ))}
            </div>
         </div>
      </a>
   );
}

export default NewsItem;
