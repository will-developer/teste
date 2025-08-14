'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import FormField from '../../molecules/formField/formField';
import { useForm } from 'react-hook-form';
import ButtonsGenerico from '../../atoms/buttonGenerico/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './registroForm.module.scss';
import { useAuth } from '@/app/context/AuthContext';

const registroSchema = z
  .object({
    email: z.email('Email inválido').min(1, 'Email é obrigatório'),
    nome: z.string().min(1, 'Nome é obrigatório'),
    sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmarSenha: z.string().min(8, 'Confirme sua senha'),
    url: z.url('URL inválida').optional(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

type Registro = z.infer<typeof registroSchema>;

export default function RegistroForm() {
  const { t } = useTranslation();
  const { registro } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registro>({
    resolver: zodResolver(registroSchema),
  });

  function handleRegistro(data: Registro) {
    const sucesso = registro(
      data.email,
      data.nome,
      data.sobrenome,
      data.senha,
      data.url,
    );
    if (sucesso) {
      router.push('/');
    } else {
      //msg de erro
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #41B6E6, #003366, #8DC63F)',
        minWidth: '100vw',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleRegistro)}
        sx={{
          width: 500,
          padding: 4,
          border: '1px solid #ccc',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          boxShadow: 3,
          gap: 4,
        }}
      >
        <div className={styles.primeiroContainer}>
          <Image
            src="/logo.png"
            alt={t('registro.logoAlt')}
            width={115}
            height={35}
          />
          <p>{t('registro.subtitle')}</p>
        </div>

        <div className={styles.segundoContainer}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <FormField
                id="email"
                label={t('registro.email')}
                type="email"
                placeholder={t('registro.emailPlaceholder')}
                {...register('email')}
              />
            </Grid>
            <Grid size={6}>
              <FormField
                id="nome"
                label={t('registro.name')}
                type="text"
                placeholder={t('registro.namePlaceholder')}
                {...register('nome')}
              />
            </Grid>
            <Grid size={6}>
              <FormField
                id="Sobrenome"
                label={t('registro.name')}
                type="text"
                placeholder={t('registro.namePlaceholder')}
                {...register('sobrenome')}
              />
            </Grid>
            <Grid size={6}>
              <FormField
                id="senha"
                label={t('registro.password')}
                type="password"
                placeholder={t('registro.passwordPlaceholder')}
                {...register('senha')}
              />
            </Grid>
            <Grid size={6}>
              <FormField
                id="confirmarSenha"
                label={t('registro.confirmPassword')}
                type="password"
                placeholder={t('registro.confirmPasswordPlaceholder')}
                {...register('confirmarSenha')}
              />
            </Grid>
            <Grid size={6}>
              <FormField
                id="urlPerfil"
                label={t('registro.url') || 'URL'}
                type="text"
                placeholder={
                  t('registro.urlPlaceholder') || 'Url da foto de perfil'
                }
                {...register('url')}
              />
            </Grid>
          </Grid>

          <ButtonsGenerico label={t('registro.button')} type="submit" />

          <Link href="/" className={styles.linkCadastro}>
            {t('registro.loginLink')}
          </Link>
        </div>
      </Box>
    </Box>
  );
}
