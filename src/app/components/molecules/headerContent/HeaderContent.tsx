import React from 'react';
import Box from '@mui/material/Box';
import SearchBar from '../../atoms/searchBar/SearchBar';
import LanguageDropdown from '../../atoms/languageDropdown/LanguageDropdown';

const HeaderContent = () => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <SearchBar />
      <LanguageDropdown />
    </Box>
  );
};

export default HeaderContent;
