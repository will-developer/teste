'use client';

import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export default FooterLink;
