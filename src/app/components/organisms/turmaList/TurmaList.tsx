'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTurmas } from '../../../context/TurmaContext';
import CardTurma from '../../molecules/turmaCard/CardTurma';
import TurmaModal from '../../molecules/turmaCard/turmaModal/TurmaModal';
import Buttons from '../../atoms/buttons/Buttons';
import styles from '../../../turmas/Turmas.module.css';

export default function TurmaList() {
  const { turmas } = useTurmas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleNovaTurma = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!i18n.isInitialized) return null;

  return (
    <>
      <div className={styles.turmasHeader}>
        <div>
          <h1 className={styles.titulo}>{t('turmas.title')}</h1>
          <h2 className={styles.subtitulo}>{t('turmas.subtitle')}</h2>
        </div>
        <Buttons label={t('turmas.newClass')} onClick={handleNovaTurma} />
      </div>

      <ul className={styles.turmasGrid}>
        {turmas.map((turma) => (
          <li key={turma.id}>
            <CardTurma turma={turma} />
          </li>
        ))}
      </ul>

      <TurmaModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
