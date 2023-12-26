import Head from 'next/head';
import { useRouter } from 'next/router';

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

export default function CreateSquad() {
  const { squadList } = useContext(SquadContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getLength = ({ length }, minLength) =>
    minLength > length ? minLength : length;

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Create your Squad" textTransform="uppercase" />
        <form className={styles.createSquad}>
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
              onClick={handleSubmit}
            />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
