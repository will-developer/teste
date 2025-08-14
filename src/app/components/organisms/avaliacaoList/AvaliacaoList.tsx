'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAvaliacoes } from '../../../context/AvaliacaoContext';
import CardAvaliacao from '../../molecules/avaliacaoCard/CardAvaliacao';
import AvaliacaoModal from '../../molecules/avaliacaoCard/avaliacaoModal/AvaliacaoModal';
import Buttons from '../../atoms/buttons/Buttons';
import styles from '../../../avaliacoes/Avaliacoes.module.css';

export default function AvaliacaoListList() {
  const { t } = useTranslation();
  const { avaliacoes } = useAvaliacoes();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNovaAvaliacao = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.avaliacoesHeader}>
        <div>
          <h1 className={styles.titulo}>{t('avaliacaoList.title')}</h1>
          <h2 className={styles.subtitulo}>{t('avaliacaoList.subtitle')}</h2>
        </div>
        <Buttons
          label={t('avaliacaoList.newEvaluation')}
          onClick={handleNovaAvaliacao}
        />
      </div>

      <ul className={styles.avaliacoesGrid}>
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao.id}>
            <CardAvaliacao avaliacao={avaliacao} />
          </li>
        ))}
      </ul>

      <AvaliacaoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
