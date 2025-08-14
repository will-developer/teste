'use client';

import { Stack } from '@mui/material';
import FooterLink from '../../atoms/footerLink/FooterLink';
import { useTranslation } from 'react-i18next';

const FooterNav = () => {
  const { t, i18n } = useTranslation();

  return (
    <Stack direction="row" spacing={2}>
      <FooterLink href="#">{t('footer.terms')}</FooterLink>
      <FooterLink href="#">{t('footer.privacy')}</FooterLink>
    </Stack>
  );
};

export default FooterNav;
