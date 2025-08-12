import React, { createContext, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, debouncedSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
