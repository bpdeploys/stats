import React from 'react';
import styles from './sportsproviderbox.module.scss';
import Image from 'next/image';

function SportsProviderBox({ selected, provider, onClick }) {
  const sportProviderSelectClasses = `${styles.mainContainer} ${
    selected ? styles.selected : ''
  }`;

  return (
    <div className={sportProviderSelectClasses} key={key} onClick={onClick}>
      <header className={styles.mainHeader}>
        <div className={styles.imageWrapper}>
          <Image
            alt="Sports Provider Logo"
            className="logo"
            src="/assets/imgs/gray.png"
            width={20}
            height={20}
          />
        </div>
      </header>
      <div className={styles.content}>
        <h2 className={styles.title}>Sports Provider</h2>
        <p className={styles.description}>230 players to select from!</p>
      </div>
    </div>
  );
}

export default SportsProviderBox;
