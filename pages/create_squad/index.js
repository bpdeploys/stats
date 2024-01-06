import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// Context
import { useContext, useState, useEffect } from 'react';
import { SquadContext } from '../../context/SquadContext';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import SquadCreationTutorial from '../../components/Squad/TutorialModal';
import CurrentPlayer from '../../components/Squad/CurrentPlayer';
import SquadPlayer from '../../components/Squad/SquadPlayer';

// Styles
import styles from './createsquad.module.scss';

// API
import { createProxyPlayerSquad } from '../../services/api';

// Context
import { useUserData } from '../../context/UserContext';

// Utils
import { getRandomNumber } from '../../utils/functions';
import useLocalStorageState from '../../utils/hooks/useLocalStorageState';

export default function CreateSquad() {
  const router = useRouter();
  const { squadList } = useContext(SquadContext);
  const { userData } = useUserData();
  const [isClient, setIsClient] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useLocalStorageState(
    'tutorialCompleted',
    false
  );

  console.log('USER DATA:', userData);

  useEffect(() => {
    // Mark as client-side once the component is mounted
    setIsClient(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const transformedPlayers = squadList.map((player) => ({
      proxy_name: player?.firstName,
      proxy_surname: player?.lastName,
      phone_number: player?.phoneNumber,
      playing_position: 1,
      squad_number: player?.squadNumber,
      email:
        player?.firstName + player?.lastName + getRandomNumber() + '@bp.com',
      team_id: userData?.team?.id,
    }));

    const payload = {
      team_id: userData?.team?.id,
      players: transformedPlayers,
    };

    try {
      const response = await createProxyPlayerSquad(payload);
      if (response) {
        console.log(response);
        toast.success('Your squad has been created!');
        router.push('/player_codes');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCurrentPlayerUpdate = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setTutorialCompleted(true);
    router.push('/edit_squad_number');
  };

  if (!isClient) {
    return <div>Loading...</div>; // Or any other placeholder content
  }

  console.log(tutorialCompleted);

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      {!tutorialCompleted && <SquadCreationTutorial />}
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Create your Squad" textTransform="uppercase" />
        <div className={styles.createSquad}>
          <h1>Create a squad of players to join your team.</h1>
          <div className={styles.createSquad__squadPlayers}>
            <CurrentPlayer onClick={onCurrentPlayerUpdate} />
            {squadList
              .map((player) => <SquadPlayer key={player.id} data={player} />)
              .concat(
                Array.from(
                  { length: Math.max(0, 11 - squadList.length) },
                  (_, index) => (
                    <SquadPlayer
                      key={`empty-${index}`}
                      empty
                      disabled={!tutorialCompleted}
                    />
                  )
                )
              )}
          </div>
          <div
            className={styles.createSquad__button}
            style={{
              filter: !tutorialCompleted ? 'blur(2px)' : 'none',
            }}
          >
            <Button
              text="Create Squad"
              color="blue"
              uppercase
              onClick={onSubmit}
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}
