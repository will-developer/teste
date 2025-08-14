import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import i18n from '../../../i18n';

const LanguageDropdown = () => {
  const [lang, setLang] = useState(i18n.language || 'pt-br');

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Box>
      <Select
        value={lang}
        onChange={handleChange}
        size="small"
        sx={{ minWidth: 100 }}
      >
        <MenuItem value="pt-br">Português</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageDropdown;
