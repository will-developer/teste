'use client';

import AvaliacaoList from '../components/organisms/avaliacaoList/AvaliacaoList';
import styles from './Avaliacoes.module.css';

export default function AvaliacoesPage() {
    return (
        <div className={styles.avaliacoesContainer}>
            <AvaliacaoList />
        </div>
    );
}