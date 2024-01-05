import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Button from '../../components/Common/Button';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import SportSelect from '../../components/SportSelect';

// Icons & Images
import BpLogo from '../../public/assets/imgs/svgs/homeLogo.svg';

// Context
import { useFormData } from '../../services/context';

// Styles
import styles from './selectsport.module.scss';
import { useUserData } from '../../context/UserContext';
import { handleLogoutStorage } from '../../utils/functions';

export default function SelectSport() {
  const router = useRouter();
  const { updateUserData } = useUserData();

  const handleLogout = (item) => {
    updateUserData(null);
    handleLogoutStorage();
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper image="grayLightningHalf">
        <section className={styles.sportSelection}>
          <div>
            <div className={styles.sportSelection__heading}>
              <Image src={BpLogo} alt="Logo" width={50} height={50} />
              <h1>Logout temporal page</h1>
            </div>
          </div>
          <Button text="Logout" color="blue" onClick={handleLogout} />
        </section>
      </ScreenWrapper>
    </>
  );
}
