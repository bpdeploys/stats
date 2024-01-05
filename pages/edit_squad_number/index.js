import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import constants from '../../utils/data/constants';
import Dropdown from '../../components/Common/Dropdown';

// Styles
import styles from './selectsquadnumber.module.scss';

export default function SelectSquadNumber() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/create_squad');
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
        <Header text="Hi Dimitri" textTransform="capitalize" />
        <div className={styles.selectSquadNumber}>
          <Dropdown
            name="squadNumber"
            placeholder="Select your Squad Number"
            items={constants.SQUAD_NUMBERS}
          />
          <div className={styles.selectSquadNumber__shirt}>
            <RedeemPlayerShirt data={sampleData} size="big" />
            <div className={styles.selectSquadNumber__info}>
              <span>Captain of</span>
              <h2>Liverpool FC</h2>
            </div>
          </div>
          <div className={styles.selectSquadNumber__button}>
            <Button text="DONE" color="blue" uppercase onClick={handleSubmit} />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}
