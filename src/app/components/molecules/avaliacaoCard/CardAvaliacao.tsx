'use client';

import Buttons from '../../atoms/buttons/Buttons';
import AvaliacaoModal from './avaliacaoModal/AvaliacaoModal';
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Avaliacao, useAvaliacoes } from '../../../context/AvaliacaoContext';
import { useTurmas } from '../../../context/TurmaContext';

interface AvaliacaoCardProps {
    avaliacao: Avaliacao;
}

export default function CardAvaliacao({ avaliacao }: AvaliacaoCardProps) {
    const { removeAvaliacao } = useAvaliacoes();
    const { getNomeTurma } = useTurmas();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleRemover = () => {
        if (window.confirm(`Tem certeza que deseja remover ${avaliacao.nome}?`)) {
            removeAvaliacao(avaliacao.id);
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
                        {avaliacao.nome}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {getNomeTurma(avaliacao.turmaId)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Buttons label="Editar" onClick={handleEditar} />
                    <Buttons label="Remover" onClick={handleRemover} />
                </CardActions>
            </Card>

            <AvaliacaoModal
                avaliacao={avaliacao}
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}