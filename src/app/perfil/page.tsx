'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Perfil() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    profissao: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        sobrenome: user.sobrenome || '',
        profissao: user.profissao || '',
        email: user.email || '',
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#f5f5f5',
          color: '#757575',
        }}
      >
        <Typography variant="h6">{t('perfil.needLogin')}</Typography>
      </Box>
    );
  }
  const handleLogout = () => {
    logout();
    router.push('./');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Box
        sx={{
          marginTop: '4rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Avatar
          src={user?.url}
          alt={t('perfil.avatarAlt')}
          sx={{ height: 80, width: 80 }}
        />
      </Box>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6}>
            <TextField
              name="nome"
              label={t('perfil.name')}
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              value={formData.nome}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name="sobrenome"
              label={t('perfil.surname')}
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              value={formData.sobrenome}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name="profissao"
              label={t('perfil.profession')}
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              value={formData.profissao}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name="email"
              label={t('perfil.email')}
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 10 }}
      >
        <Button
          variant="contained"
          onClick={() => setIsEditing(!isEditing)}
          sx={{
            backgroundColor: '#003366',
            color: 'white',
            '&:hover': { backgroundColor: '#002244' },
          }}
        >
          {isEditing ? t('perfil.save') : t('perfil.edit')}
        </Button>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: '#550d0dff',
            color: 'white',
            '&:hover': { backgroundColor: '#002244' },
          }}
        >
          {t('perfil.logout')}
        </Button>
      </Box>
    </Box>
  );
}
