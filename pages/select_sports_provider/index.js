import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';

// Data
import constants from '../../utils/data/constants';

// Styles
import styles from './selectsportsprovider.module.scss';
import SportsProviderBox from '../../components/SportsProvider/SportsProviderBox';
import { useState } from 'react';

export default function SelectSportsProvider() {
  const [sportOption, setSportOption] = useState(null);
  const [sportsList, setSportsList] = useState([
    1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13,
  ]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleSportOption = (item) => {
    setSportOption(item);
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightning" positionY="450px">
        <Header
          text="Select Sports Provider"
          textTransform="capitalize"
          noItalic
        />
        <div className={styles.providersWrapper}>
          <div className={styles.providers}>
            {sportsList.map((sport) => (
              <SportsProviderBox
                key={sport}
                sport={sport}
                selected={sportOption === sport}
                onClick={() => handleSportOption(sport)}
              />
            ))}
          </div>
          <div className={styles.providers__button}>
            <Button text="DONE" color="blue" uppercase onClick={handleSubmit} />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}
