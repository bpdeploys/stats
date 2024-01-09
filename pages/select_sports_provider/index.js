import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './selectsportsprovider.module.scss';
import SportsProviderBox from '../../components/SportsProvider/SportsProviderBox';

// API
import { fetchAllLeagueProviders } from '../../services/api';

// Context
import { useCreateTeamFormData } from '../../context/TeamContext';

export default function SelectSportsProvider() {
  const router = useRouter();
  const { setCreateTeamFormValues } = useCreateTeamFormData();

  const [sportOption, setSportOption] = useState(null);
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const fetchSportsProviders = async () => {
      try {
        const providers = await fetchAllLeagueProviders();
        setSportsList(providers);
      } catch (error) {
        console.error('Error fetching sports providers:', error);
      }
    };

    fetchSportsProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreateTeamFormValues({
        provider: sportOption,
      });
      await router.push('/create_team');
    } catch (error) {
      console.error('Error saving data or navigating:', error);
    }
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
            {sportsList.map((provider) => (
              <SportsProviderBox
                provider={provider}
                selected={sportOption === provider}
                onClick={() => handleSportOption(provider)}
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
