
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';


const SearchBar = () => {
  const { t, i18n } = useTranslation();
  if (!i18n.isInitialized) return null;
  return (
    <TextField
      variant="outlined"
      placeholder={t('header.search')}
      size="small"
      sx={{ minWidth: 200 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
