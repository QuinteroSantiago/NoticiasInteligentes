import React from 'react';

function Intro() {
    return (
        <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
            <h1 className="text-5xl md:text-7xl dark:text-black mb-1 md:mb-3 font-bold">Gomu Cloud</h1>
            <p className="text-base md:text-2xl mb-3 font-medium">Santiago Quintero</p>
            <p className="text-md max-w-xl mb-6">
                I plan to use this as a portfolio for all the things I want to do.
                <br />
            </p>
        </div>
    )
}

export default Intro;