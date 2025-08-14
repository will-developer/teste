'use client';

import CopyrightText from '../../atoms/copyRightText/CopyRightText';
import FooterLink from '../../atoms/footerLink/FooterLink';

export default function Copyright() {
  return (
    <CopyrightText variant="body2" align="center">
      {'Copyright © '}
      <FooterLink href="#">Avalia+</FooterLink>{' '}
      {new Date().getFullYear()}
    </CopyrightText>
  );
}
