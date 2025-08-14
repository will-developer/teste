'use client';

import { useState, useEffect } from 'react';
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
import { Avaliacao, useAvaliacoes } from '../../../../context/AvaliacaoContext';
import { useTurmas } from '../../../../context/TurmaContext';
import Buttons from '../../../atoms/buttons/Buttons';

interface AvaliacaoModalProps {
    avaliacao?: Avaliacao;
    isOpen: boolean;
    onClose: () => void;
}

export default function AvaliacaoModal({
    avaliacao,
    isOpen,
    onClose,
}: AvaliacaoModalProps) {
    const { addAvaliacao, updateAvaliacao } = useAvaliacoes();
    const { turmas } = useTurmas();
    const [nome, setNome] = useState('');
    const [turmaId, setTurmaId] = useState<number | ''>('');

    const isEditMode = avaliacao !== undefined;

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setNome(avaliacao.nome);
                setTurmaId(avaliacao.turmaId);
            } else {
                setNome('');
                setTurmaId('');
            }
        }
    }, [isOpen, avaliacao, isEditMode, turmas]);

    const handleSalvar = () => {

        if (!nome.trim()) {
            alert('Nome da avaliação não pode estar vazio');
            return;
        }

        if (isEditMode) {
            updateAvaliacao(avaliacao.id, {
                nome: nome.trim(),
                turmaId: Number(turmaId),
            });
        } else {
            addAvaliacao({
                nome: nome.trim(),
                turmaId: Number(turmaId),
            });
        }

        onClose();
    };

    const handleCancelar = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleCancelar} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditMode ? 'Editar Avaliação' : 'Nova Avaliação'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Selecione a turma</InputLabel>
                    <Select
                        value={turmaId}
                        label="Selecione a turma"
                        onChange={(e) => setTurmaId(Number(e.target.value))}
                    >
                        {
                            turmas.map((turma) => (
                                <MenuItem key={turma.id} value={turma.id}>
                                    {turma.nome} - {turma.anoLetivo}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Buttons label="Cancelar" onClick={handleCancelar} />
                <Buttons label="Salvar" onClick={handleSalvar} />
            </DialogActions>
        </Dialog>
    );
}