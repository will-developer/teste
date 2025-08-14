'use client';

import Buttons from '../../atoms/buttons/Buttons';
import NotaModal from './notaModal/NotaModal';
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Nota, useNotas } from '../../../context/NotaContext';
import { useAlunos } from '../../../context/AlunoContext';
import { useAvaliacoes } from '../../../context/AvaliacaoContext';

interface NotaCardProps {
    nota: Nota;
}

export default function CardNota({ nota }: NotaCardProps) {
    const { removerNota } = useNotas();
    const { getNomeAluno } = useAlunos();
    const { getNomeAvaliacao } = useAvaliacoes();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleRemover = () => {
        if (window.confirm(`Tem certeza que deseja remover esta nota?`)) {
            removerNota(nota.id);
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
                        {getNomeAluno(nota.alunoId)}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5, mt: 1.5 }}>
                        Avaliação: {getNomeAvaliacao(nota.avaliacaoId)}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        Nota: {nota.valor}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Buttons label="Editar" onClick={handleEditar} />
                    <Buttons label="Remover" onClick={handleRemover} />
                </CardActions>
            </Card>

            <NotaModal
                nota={nota}
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}