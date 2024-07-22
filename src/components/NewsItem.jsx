import { useState, useEffect } from 'react';

function NewsItem({ title, imgUrl, tags, link, date, sentimentScore }) {
   const [imageUrl, setImageUrl] = useState('/assets/placeholder-for-na.png');
   const [sentimentPercentage, setSentimentPercentage] = useState(50); // Default at neutral (50)
   const [textColor, setTextColor] = useState('text-black'); // Default text color

   useEffect(() => {

      // Calculate positivity score from sentimentScore and update text color
      const calculatedScore = sentimentScore * 100;
      setSentimentPercentage(calculatedScore);

      if (calculatedScore >= 50) {
         setTextColor('text-green-500');
      } else if (calculatedScore > 0.1) {
         setTextColor('text-green-200');
      } else if (calculatedScore > -0.1) {
         setTextColor('text-white');
      } else if (calculatedScore >= -50) {
         setTextColor('text-red-200');
      } else {
         setTextColor('text-red-500');
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
         className={`border-2 border-stone-500 rounded-md overflow-hidden w-full md:w-60 shadow-lg transition-shadow hover:shadow-xl`}
      >
         <div className="relative">
            <img
               src={imageUrl}
               alt={title}
               className="w-full h-36 md:h-48 object-cover cursor-pointer"
            />
            <p className="absolute top-2 right-2 text-white text-sm bg-stone-800 opacity-75 rounded-lg px-2 py-1">
               {date}
            </p>
            <p className={`absolute bottom-2 left-2 text-lg font-bold bg-stone-700 opacity-90 rounded-lg px-2 py-1 ${textColor}`}>
               {`${Math.abs(sentimentPercentage).toFixed(0)}% ${sentimentPercentage < 0 ? 'Negativo' : 'Positivo'}`}
            </p>
         </div>
         <div className="p-2">
            <h3 className="text-lg md:text-xl mb-2 font-semibold">{title}</h3>
            <div className="flex flex-wrap gap-2">
               {tags.slice(0, 5).map((item, index) => (
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
