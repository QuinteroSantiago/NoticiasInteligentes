import React from 'react';

function Intro() {
    return (
        <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
            <h1 className="text-5xl md:text-7xl dark:text-black mb-1 md:mb-3 font-bold">Noticias Inteligentes</h1>
            <p className="text-md max-w-xl mb-6">
            Las noticias buenas del día, traídas por la Inteligencia Artificial
                <br />
            </p>
        </div>
    )
}

export default Intro;