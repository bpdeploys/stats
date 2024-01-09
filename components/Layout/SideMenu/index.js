import React from 'react';
import Link from 'next/link';

// Styles
import styles from './sidemenu.module.scss';

// Context
import { useUserData } from '../../../context/UserContext';

// Hooks
import { useHasMounted } from '../../../utils/hooks/useHasMounted';

const links = [
  { title: 'User Profile', path: '/user-profile' },
  { title: 'Player Profile', path: '/player-profile' },
  { title: 'Team Profile', path: '/team-profile' },
  { title: 'Fantasy', path: '/fantasy' },
  { title: 'Homewall', path: '/homewall' },
  { title: 'League Page', path: '/league-page' },
  { title: 'Achievements', path: '/achievements' },
  { title: 'Settings', path: '/settings' },
];

const SideMenu = ({ isOpen, onClose }) => {
  const { userData } = useUserData();
  const hasMounted = useHasMounted();

  if (!hasMounted || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.closeBtn} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <line
              x1="21.9204"
              y1="22.6275"
              x2="7.07113"
              y2="7.7783"
              stroke="white"
            />
            <line
              x1="7.07125"
              y1="21.9204"
              x2="21.9205"
              y2="7.07119"
              stroke="white"
            />
          </svg>
        </div>
        <div className={styles.sideMenu__header}>
          <div className={styles.sideMenu__bpc}>
            <span>{userData?.bp_points}</span>
            <small>bpc</small>
          </div>
          <Link href={'/'}>Go to Wallet</Link>
        </div>
        <div className={styles.sideMenu__links}>
          <nav>
            <ul>
              {links.map((link) => (
                <li key={link.title}>
                  <Link href={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.sideMenu__topLght}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="327"
            height="143"
            viewBox="0 0 327 143"
            fill="none"
          >
            <path
              d="M-63 0C52.5869 13.3053 121.815 14.2331 240.224 19.2822L199.748 59.0881C245.588 71.6146 327 79.7245 327 79.7245V142.859C227.053 137.379 166.261 127.592 55.4947 99.4078L106.499 71.6146C32.0632 58.2175 7.33927 48.9324 -62.9991 38.9352L-63 0Z"
              fill="#125B9F"
            />
            <path
              d="M-63 0C52.5869 13.3053 121.815 14.2331 240.224 19.2822L199.748 59.0881C245.588 71.6146 327 79.7245 327 79.7245V142.859C227.053 137.379 166.261 127.592 55.4947 99.4078L106.499 71.6146C32.0632 58.2175 7.33927 48.9324 -62.9991 38.9352L-63 0Z"
              fill="#1361A9"
              fill-opacity="0.04"
            />
          </svg>
        </div>
        <div className={styles.sideMenu__bottomLght}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="327"
            height="143"
            viewBox="0 0 327 143"
            fill="none"
          >
            <path
              d="M-63 0C52.5869 13.3053 121.815 14.2331 240.224 19.2822L199.748 59.0881C245.588 71.6146 327 79.7245 327 79.7245V142.859C227.053 137.379 166.261 127.592 55.4947 99.4078L106.499 71.6146C32.0632 58.2175 7.33927 48.9324 -62.9991 38.9352L-63 0Z"
              fill="#125B9F"
            />
            <path
              d="M-63 0C52.5869 13.3053 121.815 14.2331 240.224 19.2822L199.748 59.0881C245.588 71.6146 327 79.7245 327 79.7245V142.859C227.053 137.379 166.261 127.592 55.4947 99.4078L106.499 71.6146C32.0632 58.2175 7.33927 48.9324 -62.9991 38.9352L-63 0Z"
              fill="#1361A9"
              fill-opacity="0.04"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
