import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// Context
import { useContext } from 'react';
import { SquadContext } from '../../context/SquadContext';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './createsquad.module.scss';
import SquadPlayer from '../../components/Squad/SquadPlayer';
import { createProxyPlayerSquad } from '../../services/api';

export default function CreateSquad() {
  const { squadList } = useContext(SquadContext);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const transformedPlayers = squadList.map((player) => ({
      proxy_name: player?.firstName,
      proxy_surname: player?.lastName,
      phone_number: player?.phoneNumber,
      playing_position: 1,
      squad_number: player?.squadNumber,
      email: player?.phoneNumber + '@bp.com',
      team_id: 10,
    }));

    const payload = {
      players: transformedPlayers,
    };

    try {
      const response = await createProxyPlayerSquad(payload);
      if (response.success) {
        console.log(response);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Create your Squad" textTransform="uppercase" />
        <div className={styles.createSquad}>
          <h1>Create a squad of players to join your team.</h1>
          <div className={styles.createSquad__squadPlayers}>
            {squadList
              .map((player) => <SquadPlayer key={player.id} data={player} />)
              .concat(
                Array.from(
                  { length: Math.max(0, 12 - squadList.length) },
                  (_, index) => <SquadPlayer key={`empty-${index}`} empty />
                )
              )}
          </div>
          <div className={styles.createSquad__button}>
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
