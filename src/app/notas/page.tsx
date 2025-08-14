'use client';

import NotaList from '../components/organisms/notaList/NotaList';
import styles from './Notas.module.css';

export default function NotasPage() {
    return (
        <div className={styles.notasContainer}>
            <NotaList />
        </div>
    );
}