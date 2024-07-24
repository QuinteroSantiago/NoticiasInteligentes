import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <input
            type="text"
            placeholder="Search news..."
            className="px-4 py-2 rounded border shadow mb-5" // Tailwind class for margin bottom
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
        />
    );
}

export default SearchBar;
