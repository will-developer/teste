'use client';

import AlunoList from '../components/organisms/alunoList/AlunoList';
import styles from './Alunos.module.css';

export default function AlunosPage() {
    return (
        <div className={styles.alunosContainer}>
            <AlunoList />
        </div>
    );
}