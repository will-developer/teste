import React from 'react';
import Box from '@mui/material/Box';
import HeaderContent from '../../molecules/headerContent/HeaderContent';
import Logo from '../../molecules/logo/Logo';

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      sx={{ py: 2 }}
    >
      <Logo />
      <HeaderContent />
    </Box>
  );
};

export default Header;
