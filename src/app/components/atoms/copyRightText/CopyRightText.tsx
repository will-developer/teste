'use client';

import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default CopyrightText;
