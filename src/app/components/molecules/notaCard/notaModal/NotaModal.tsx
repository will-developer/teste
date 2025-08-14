'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Nota, useNotas } from '../../../../context/NotaContext';
import { useAlunos } from '../../../../context/AlunoContext';
import { useAvaliacoes } from '../../../../context/AvaliacaoContext';
import Buttons from '../../../atoms/buttons/Buttons';

interface NotaModalProps {
  nota?: Nota;
  isOpen: boolean;
  onClose: () => void;
}

export default function NotaModal({ nota, isOpen, onClose }: NotaModalProps) {
  const { t } = useTranslation();
  const { adicionarNota, editarNota } = useNotas();
  const { alunos } = useAlunos();
  const { avaliacoes } = useAvaliacoes();
  const [alunoId, setAlunoId] = useState<number | ''>('');
  const [avaliacaoId, setAvaliacaoId] = useState<number | ''>('');
  const [valor, setValor] = useState<number | ''>('');

  const isEditMode = nota !== undefined;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setAlunoId(nota.alunoId);
        setAvaliacaoId(nota.avaliacaoId);
        setValor(nota.valor);
      } else {
        setAlunoId('');
        setAvaliacaoId('');
        setValor('');
      }
    }
  }, [isOpen, nota, isEditMode, alunos, avaliacoes]);

  const handleSalvar = () => {
    if (isEditMode) {
      editarNota(nota.id, {
        alunoId: Number(alunoId),
        avaliacaoId: Number(avaliacaoId),
        valor: Number(valor),
      });
    } else {
      adicionarNota({
        alunoId: Number(alunoId),
        avaliacaoId: Number(avaliacaoId),
        valor: Number(valor),
      });
    }

    onClose();
  };

  const handleCancelar = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCancelar} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? t('notaModal.editTitle') : t('notaModal.newTitle')}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>{t('notaModal.selectStudent')}</InputLabel>
          <Select
            value={alunoId}
            label={t('notaModal.selectStudent')}
            onChange={(e) => setAlunoId(Number(e.target.value))}
          >
            {alunos.map((aluno) => (
              <MenuItem key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>{t('notaModal.selectEvaluation')}</InputLabel>
          <Select
            value={avaliacaoId}
            label={t('notaModal.selectEvaluation')}
            onChange={(e) => setAvaliacaoId(Number(e.target.value))}
          >
            {avaliacoes.map((avaliacao) => (
              <MenuItem key={avaliacao.id} value={avaliacao.id}>
                {avaliacao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label={t('notaModal.grade')}
          type="number"
          fullWidth
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Buttons label={t('notaModal.cancel')} onClick={handleCancelar} />
        <Buttons label={t('notaModal.save')} onClick={handleSalvar} />
      </DialogActions>
    </Dialog>
  );
}
