// StateProvider.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FILTERS,
  SORT_METHODS,
  DEFAULT_FILTER,
  DEFAULT_SORT_METHOD,
  DEFAULT_ITEMS_PER_PAGE,
  LOCAL_STORAGE_KEYS,
} from './constants';

interface StateContextType {
  filter: string;
  setFilter: (filter: string) => void;
  sortMethod: string;
  setSortMethod: (sortMethod: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useNewsState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useNewsState must be used within a StateProvider');
  }
  return context;
};

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState(() => 
    localStorage.getItem(LOCAL_STORAGE_KEYS.NEWS_FILTER) || DEFAULT_FILTER
  );
  const [sortMethod, setSortMethod] = useState(() => 
    localStorage.getItem(LOCAL_STORAGE_KEYS.NEWS_SORT_METHOD) || DEFAULT_SORT_METHOD
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NEWS_FILTER, filter);
    localStorage.setItem(LOCAL_STORAGE_KEYS.NEWS_SORT_METHOD, sortMethod);
  }, [filter, sortMethod]);

  const value = {
    filter,
    setFilter,
    sortMethod,
    setSortMethod,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    searchTerm,
    setSearchTerm,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};