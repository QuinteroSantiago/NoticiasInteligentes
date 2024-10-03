import React from 'react';

function Intro() {
    return (
        <div className="flex items-center justify-center flex-col text-center pt-20 pb-3 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
            <h1 className="text-5xl md:text-7xl dark:text-black mb-1 md:mb-3">
            <span className="font-bold">Noti</span><span className="font-extralight">cias</span> 
            <span className="font-bold"> Pos</span><span className="font-extralight">itivas</span>
            </h1>
            <h2 className="text-md max-w-xl mb-6 leading-normal">
                Las noticias buenas del día! Traídas por la Inteligencia Artificial.
            </h2>
        </div>
    )
}

export default Intro;
