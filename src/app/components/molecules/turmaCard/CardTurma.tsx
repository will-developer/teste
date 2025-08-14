'use client';

import Buttons from '../../atoms/buttons/Buttons';
import TurmaModal from './turmaModal/TurmaModal';
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Turma, useTurmas } from '../../../context/TurmaContext';

interface TurmaCardProps {
  turma: Turma;
}

export default function CardTurma({ turma }: TurmaCardProps) {
  const { removeTurma } = useTurmas();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRemover = () => {
    if (window.confirm(`Tem certeza que deseja remover a ${turma.nome}?`)) {
      removeTurma(turma.id);
    }
  };

  const handleEditar = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {turma.nome}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Ano Letivo: {turma.anoLetivo}
          </Typography>
        </CardContent>
        <CardActions>
          <Buttons label="Editar" onClick={handleEditar} />
          <Buttons label="Remover" onClick={handleRemover} />
        </CardActions>
      </Card>

      <TurmaModal
        turma={turma}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
