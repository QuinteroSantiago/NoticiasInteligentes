import React from 'react';
import { FILTERS, SORT_METHODS } from '../constants';

function NewsControls({ filter, setFilter, setSortMethod, sortMethod }) {
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSortChange = (event) => {
        setSortMethod(event.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center w-full mb-4">
            <button onClick={() => handleFilterChange(FILTERS.ALL)} className={`mx-2 px-4 py-2 rounded ${filter === FILTERS.ALL ? 'border-2 border-black bg-gray-200' : 'bg-gray-200'}`}>Todas las noticias</button>
            <button onClick={() => handleFilterChange(FILTERS.POSITIVE)} className={`mx-2 px-4 py-2 rounded ${filter === FILTERS.POSITIVE ? 'border-2 border-black bg-green-200' : 'bg-green-200'}`}>Noticias positivas</button>
            <button onClick={() => handleFilterChange(FILTERS.NEGATIVE)} className={`mx-2 px-4 py-2 rounded ${filter === FILTERS.NEGATIVE ? 'border-2 border-black bg-red-200' : 'bg-red-200'}`}>Noticias negativas</button>
            <select onChange={handleSortChange} value={sortMethod} className="mx-2 px-4 py-2 rounded bg-blue-200">
                <option value={SORT_METHODS.DATE}>Más recientes</option>
                <option value={SORT_METHODS.MOST_POSITIVE}>Más positivas</option>
                <option value={SORT_METHODS.MOST_NEGATIVE}>Más negativas</option>
                <option value={SORT_METHODS.ALPHABETICAL}>Alfabético</option>
            </select>
        </div>
    );
}

export default NewsControls;