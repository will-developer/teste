'use client';

import React, { ReactNode } from 'react';
import { TurmasProvider } from './context/TurmaContext';
import { AlunosProvider } from './context/AlunoContext';
import { NotasProvider } from './context/NotaContext';
import { AvaliacoesProvider } from './context/AvaliacaoContext';
import Header from './components/organisms/header/Header';
import Container from '@mui/material/Container';
import Footer from './components/organisms/footer/Footer';

interface WrapperLayoutProps {
  children: ReactNode;
}

export default function WrapperLayout({ children }: WrapperLayoutProps) {
  return (
    <>
      <div
        style={{
          width: '100%',
          background: 'white',
          borderTop: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg" sx={{ px: 5 }}>
          <Header />
        </Container>
      </div>
      <main>
        <Container maxWidth="lg" sx={{ px: 5 }}>
          <TurmasProvider>
            <AlunosProvider>
              <AvaliacoesProvider>
                <NotasProvider>
                  {children}
                </NotasProvider>
              </AvaliacoesProvider>
            </AlunosProvider>
          </TurmasProvider>
        </Container>
      </main>
      <Footer />
    </>
  );
}
