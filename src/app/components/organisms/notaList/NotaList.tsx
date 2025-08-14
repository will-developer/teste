'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotas } from '../../../context/NotaContext';
import CardNota from '../../molecules/notaCard/CardNota';
import NotaModal from '../../molecules/notaCard/notaModal/NotaModal';
import Buttons from '../../atoms/buttons/Buttons';
import styles from '../../../notas/Notas.module.css';

export default function NotaList() {
  const { t } = useTranslation();
  const { notas } = useNotas();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNovaNota = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.notasHeader}>
        <div>
          <h1 className={styles.titulo}>{t('notaList.title')}</h1>
          <h2 className={styles.subtitulo}>{t('notaList.subtitle')}</h2>
        </div>
        <Buttons label={t('notaList.newGrade')} onClick={handleNovaNota} />
      </div>

      <ul className={styles.notasGrid}>
        {notas.map((nota) => (
          <li key={nota.id}>
            <CardNota nota={nota} />
          </li>
        ))}
      </ul>

      <NotaModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
