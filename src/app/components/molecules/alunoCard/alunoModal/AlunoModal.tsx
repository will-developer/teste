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
import { Aluno, useAlunos } from '../../../../context/AlunoContext';
import { useTurmas } from '../../../../context/TurmaContext';
import Buttons from '../../../atoms/buttons/Buttons';

interface AlunoModalProps {
    aluno?: Aluno;
    isOpen: boolean;
    onClose: () => void;
}

export default function AlunoModal({
    aluno,
    isOpen,
    onClose,
}: AlunoModalProps) {
    const { addAluno, updateAluno } = useAlunos();
    const { turmas } = useTurmas();
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [turmaId, setTurmaId] = useState<number | ''>('');

    const isEditMode = aluno !== undefined;

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setNome(aluno.nome);
                setMatricula(aluno.matricula);
                setTurmaId(aluno.turmaId);
            } else {
                setNome('');
                setMatricula('');
                setTurmaId('');
            }
        }
    }, [isOpen, aluno, isEditMode, turmas]);

    const handleSalvar = () => {

        if (!nome.trim()) {
            alert('Nome do aluno não pode estar vazio');
            return;
        }

        if (!matricula.trim()) {
            alert('Matrícula não pode estar vazia');
            return;
        }

        if (isEditMode) {
            updateAluno(aluno.id, {
                nome: nome.trim(),
                matricula: matricula.trim(),
                turmaId: Number(turmaId),
            });
        } else {
            addAluno({
                nome: nome.trim(),
                matricula: matricula.trim(),
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
            <DialogTitle>{isEditMode ? 'Editar Aluno' : 'Novo Aluno'}</DialogTitle>
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
                <TextField
                    margin="dense"
                    label="Matricula"
                    type="text"
                    fullWidth
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
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