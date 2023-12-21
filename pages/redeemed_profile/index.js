import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './redeemedprofile.module.scss';
import SquadPlayer from '../../components/Squad/SquadPlayer';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';

export default function RedeemedProfile() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sampleData = {
    playingPosition: 'F',
    squadNumber: '10',
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Hi Rivas" textTransform="capitalize" />
        <div className={styles.redeemedProfile}>
          <h1>Your Squad Number is...</h1>
          <div className={styles.redeemedProfile__shirt}>
            <RedeemPlayerShirt data={sampleData} size="big" />
            <div className={styles.redeemedProfile__info}>
              <span>For</span>
              <h2>Liverpool FC</h2>
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
