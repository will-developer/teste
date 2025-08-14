"use client";
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

interface Props {
  children: React.ReactNode;
}

export default function I18nProviderWrapper({ children }: Props) {
  return (
    <I18nextProvider i18n={i18n}>
      <React.Suspense fallback={null}>
        {children}
      </React.Suspense>
    </I18nextProvider>
  );
}
