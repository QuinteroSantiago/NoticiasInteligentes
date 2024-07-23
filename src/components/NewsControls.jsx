import React from 'react';

function NewsControls({ filter, setFilter, setSortMethod, sortMethod }) {

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSortChange = (event) => {
        setSortMethod(event.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center w-full mb-4">
            <button onClick={() => handleFilterChange('all')} className={`mx-2 px-4 py-2 rounded ${filter === 'all' ? 'border-2 border-black bg-gray-200' : 'bg-gray-200'}`}>Todas las noticias</button>
            <button onClick={() => handleFilterChange('positive')} className={`mx-2 px-4 py-2 rounded ${filter === 'positive' ? 'border-2 border-black bg-green-200' : 'bg-green-200'}`}>Noticias positivas</button>
            <button onClick={() => handleFilterChange('negative')} className={`mx-2 px-4 py-2 rounded ${filter === 'negative' ? 'border-2 border-black bg-red-200' : 'bg-red-200'}`}>Noticias negativas</button>
            <select onChange={handleSortChange} value={sortMethod} className="mx-2 px-4 py-2 rounded bg-blue-200">
                <option value="date">Más recientes</option>
                <option value="most_positive">Más positivas</option>
                <option value="most_negative">Más negativas</option>
                <option value="alphabetical">Alfabético</option>
            </select>
        </div>
    );
}

export default NewsControls;
