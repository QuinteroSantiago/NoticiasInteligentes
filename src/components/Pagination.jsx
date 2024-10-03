import React from 'react';
import { ITEMS_PER_PAGE_OPTIONS } from '../constants';

function Pagination({ currentPage, numPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
    const pageNumbers = [];
    pageNumbers.push(1);  // Always include the first page

    // Determine a smaller range around the current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(numPages - 1, currentPage + 1);

    if (currentPage - 1 > 2) {
        pageNumbers.push('...');  // Ellipsis for skipping numbers
    }

    for (let page = startPage; page <= endPage; page++) {
        pageNumbers.push(page);
    }

    if (currentPage + 1 < numPages - 1) {
        pageNumbers.push('...');  // Ellipsis for skipping numbers
    }

    // Always show the last page if numPages is not 1
    if (numPages > 1) {
        pageNumbers.push(numPages);
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <div className="flex items-center justify-center space-x-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
                >
                    Anterior
                </button>
                {pageNumbers.map((page) => (
                    page === '...' ? (
                        <span key={page} className="px-3 py-1">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            disabled={page === currentPage}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-500 text-blue-700'}`}
                        >
                            {page}
                        </button>
                    )
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === numPages}
                    className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
                >
                    Siguiente
                </button>
            </div>
            <div>
                <select
                    onChange={onItemsPerPageChange}
                    value={itemsPerPage}
                    className="px-4 py-2 rounded bg-blue-200 hover:bg-blue-400 cursor-pointer"
                >
                    {ITEMS_PER_PAGE_OPTIONS.map(option => (
                        <option key={option} value={option}>{option} ítems por página</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Pagination;
