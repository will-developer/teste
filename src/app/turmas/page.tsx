'use client';

import SwipeableTemporaryDrawer from '../components/asideBar/SwipeableDrawer';
import TurmaList from '../components/organisms/turmaList/TurmaList';
import styles from './Turmas.module.css';

export default function TurmasPage() {
  return (
    <div className={styles.turmasContainer}>
      <SwipeableTemporaryDrawer/>
      <TurmaList />
    </div>
  );
}
