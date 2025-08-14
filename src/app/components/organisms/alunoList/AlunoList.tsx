'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlunos } from '../../../context/AlunoContext';
import CardAluno from '../../molecules/alunoCard/CardAluno';
import AlunoModal from '../../molecules/alunoCard/alunoModal/AlunoModal';
import Buttons from '../../atoms/buttons/Buttons';
import styles from '../../../alunos/Alunos.module.css';

export default function AlunoList() {
  const { alunos } = useAlunos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleNovoAluno = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!i18n.isInitialized) return null;

  return (
    <>
      <div className={styles.alunosHeader}>
        <div>
          <h1 className={styles.titulo}>{t('alunos.title')}</h1>
          <h2 className={styles.subtitulo}>{t('alunos.subtitle')}</h2>
        </div>
        <Buttons label={t('alunos.newStudent')} onClick={handleNovoAluno} />
      </div>

      <ul className={styles.alunosGrid}>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            <CardAluno aluno={aluno} />
          </li>
        ))}
      </ul>

      <AlunoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
