'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Turma, useTurmas } from '../../../../context/TurmaContext';
import Buttons from '../../../atoms/buttons/Buttons';

interface TurmaModalProps {
  turma?: Turma; 
  isOpen: boolean;
  onClose: () => void;
}

export default function TurmaModal({
  turma,
  isOpen,
  onClose,
}: TurmaModalProps) {
  const { addTurma, updateTurma } = useTurmas();
  const [nome, setNome] = useState('');
  const [anoLetivo, setAnoLetivo] = useState(
    new Date().getFullYear().toString(),
  );

  const isEditMode = turma !== undefined;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setNome(turma.nome);
        setAnoLetivo(turma.anoLetivo.toString());
      } else {
        setNome('');
        setAnoLetivo(new Date().getFullYear().toString());
      }
    }
  }, [isOpen, turma, isEditMode]);

  const handleSalvar = () => {
    const anoLetivoNum = parseInt(anoLetivo);

    if (!nome.trim()) {
      alert('Nome da turma não pode estar vazio');
      return;
    }

    if (isNaN(anoLetivoNum)) {
      alert('Ano letivo não pode estar vazio');
      return;
    }

    if (isEditMode) {
      updateTurma(turma.id, {
        nome: nome.trim(),
        anoLetivo: anoLetivoNum,
      });
    } else {
      addTurma({
        nome: nome.trim(),
        anoLetivo: anoLetivoNum,
      });
    }

    onClose();
  };

  const handleCancelar = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCancelar} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Editar Turma' : 'Nova Turma'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da Turma"
          type="text"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Ano Letivo"
          type="number"
          fullWidth
          value={anoLetivo}
          onChange={(e) => setAnoLetivo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Buttons label="Cancelar" onClick={handleCancelar} />
        <Buttons label="Salvar" onClick={handleSalvar} />
      </DialogActions>
    </Dialog>
  );
}
