import {useState, useEffect} from 'react';

function NewsItem({ title, imgUrl, tags, link, date, sentimentScore }) {
	const [borderColor, setSentiment] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);


	useEffect(() => {
		if (sentimentScore < 0.2 && sentimentScore >= 0) {
			setSentiment('border-stone-900');
		} else if (sentimentScore >= 0.2) {
			setSentiment('border-green-500');
		} else {
			setSentiment('border-red-500');
      }
	}, []);

   useEffect(() => {
		if (imgUrl == null) {
			setImageUrl('/assets/placeholder-for-na.png');
		} else {
         setImageUrl(imgUrl);
      }
	}, []);

   return (
      <a 
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className={`${borderColor} border-4 rounded-md overflow-hidden`}
      >
         <div class="relative">
            <img
               src={imageUrl}
               alt={imageUrl}
               className="w-full h-36 md:h-48 object-cover cursor-pointer"
            />
            <p className="absolute text-s top-2 right-2 text-white">
               <span className="inline-block px-1 border-2  bg-stone-800 opacity-75 rounded-lg">
                  {date}
               </span>
            </p>
         </div>
         <div className="w-full p-2">
            <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-semibold">{title}</h3>
            <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm ">
               {tags.map(item => (
                  <span className="inline-block px-2 py-1 border-2 border-stone-900  rounded-md">
                     {item}
                  </span>
               ))}
            </p>
         </div>
      </a>
   )
}

export default NewsItem;