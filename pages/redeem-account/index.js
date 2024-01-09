import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './redeemedprofile.module.scss';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import { useEffect, useState } from 'react';
import { getProxyData } from '../../services/api';
import { toast } from 'react-toastify';
import { useUserData } from '../../context/UserContext';
import { useLoading } from '../../utils/hooks/useLoading';
import { useHasMounted } from '../../utils/hooks/useHasMounted';

export default function RedeemAccount() {
  const router = useRouter();
  const { code } = router.query;
  const { userData, updateUserData } = useUserData();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (code && hasMounted) {
      startLoading();
      getProxyData(code)
        .then((data) => {
          updateUserData(data);
          stopLoading();
        })
        .catch((error) => {
          console.log(error);
          stopLoading();
        });
    } else {
      stopLoading();
    }
  }, [code, hasMounted, startLoading, stopLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/key_details');
  };

  const shirtData = {
    squadNumber: userData?.squad_number[0]?.number || 10,
  };

  if (isLoading || !userData || !hasMounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header
          text={'Hi ' + userData?.proxy_name}
          textTransform="capitalize"
        />
        <div className={styles.redeemedProfile}>
          <h1>Your Squad Number is...</h1>
          <div className={styles.redeemedProfile__shirt}>
            <RedeemPlayerShirt data={shirtData} size="big" />
            <div className={styles.redeemedProfile__info}>
              <span>For</span>
              <h2>{userData?.squad_number[0].team_id.team_name}</h2>
            </div>
          </div>
          <div className={styles.redeemedProfile__button}>
            <Button
              text="Update Profile"
              color="blue"
              uppercase
              onClick={handleSubmit}
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}
