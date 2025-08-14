'use client';

import Buttons from '../../atoms/buttons/Buttons';
import AlunoModal from './alunoModal/AlunoModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Aluno, useAlunos } from '../../../context/AlunoContext';
import { useTurmas } from '../../../context/TurmaContext';


interface AlunoCardProps {
    aluno: Aluno;
}

export default function CardAluno({ aluno }: AlunoCardProps) {
    const { removeAluno } = useAlunos();
    const { getNomeTurma } = useTurmas();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const handleRemover = () => {
        if (window.confirm(t('alunos.removeConfirm', { name: aluno.nome }))) {
            removeAluno(aluno.id);
        }
    };

    const handleEditar = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    if (!i18n.isInitialized) return null;

    return (
        <>
            <Card sx={{ minWidth: 275, mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {aluno.nome}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {t('alunos.matricula')}: {aluno.matricula}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {getNomeTurma(aluno.turmaId)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Buttons label={t('alunos.edit')} onClick={handleEditar} />
                    <Buttons label={t('alunos.remove')} onClick={handleRemover} />
                </CardActions>
            </Card>

            <AlunoModal
                aluno={aluno}
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}