'use client';
import { useAuth } from "@/app/context/AuthContext";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import FormField from '../../molecules/formField/formField';
import { useForm } from 'react-hook-form';
import ButtonsGenerico from '../../atoms/buttonGenerico/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './loginForm.module.scss';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.email('email inválido').min(1, 'Email inválido'),
  senha: z.string().min(8, 'A senha deve ter no minimo 8 caracteres'),
});
type Login = z.infer<typeof loginSchema>;

// tipo dos zod em cima
export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  // isso aqui é o form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  // função do login
  function handleLogin(data: Login) {
    const sucesso = login(data.email, data.senha);
    if (sucesso) {
      router.push('/turmas');
    }
    else{
      //vou por um alert dps bonito
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #41B6E6, #003366, #8DC63F)",
        minWidth: "100vw",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        sx={{
          width: 500,
          height: 550,
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          boxShadow: 2,
          gap: 5,
        }}
      >
        <div className={styles.primeiroContainer}>
          <Image src="/logo.png" alt="Logo do site" width={115} height={35} />
          <p>{t('login.subtitle')}</p>
        </div>

        <div className={styles.segundoContainer}>
          <FormField
            id="email"
            label={t('login.email')}
            type="email"
            placeholder={t('login.emailPlaceholder')}
            {...register('email')}
          />
          <FormField
            id="senha"
            label={t('login.password')}
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            {...register('senha')}
          />

          <div className={styles.acaoContainer}>
            <ButtonsGenerico label={t('login.button')} type="submit" />
            <Link href="./registro" className={styles.linkCadastro}>
              {t('login.noAccount')}
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
}
