'use client';

import { Box, Container } from '@mui/material';
import Copyright from '../../molecules/copyright/Copyright';
import FooterNav from '../../molecules/footerNav/FooterNav';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        padding: 2,
        marginTop: 'auto',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Copyright />
        <FooterNav />
      </Container>
    </Box>
  );
}
