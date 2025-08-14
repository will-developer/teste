'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <Link
      href="/turmas"
      style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
    >
      <Image
        src="/logo.png"
        alt="Logo da Avalia+"
        width={105}
        height={30}
        priority
        className={styles.logoImg}
      />
    </Link>
  );
}
