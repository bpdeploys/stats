import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './createsquad.module.scss';
import SquadPlayer from '../../components/Squad/SquadPlayer';

export default function CreateSquad() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getLength = ({ length }, minLength) =>
    minLength > length ? minLength : length;

  const sampleList = [
    {
      firstName: 'John',
      lastName: 'Doe',
      playingPosition: 'M',
      squadNumber: '1',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      playingPosition: 'M',
      squadNumber: '1',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      playingPosition: 'M',
      squadNumber: '1',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      playingPosition: 'M',
      squadNumber: '1',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      playingPosition: 'M',
      squadNumber: '1',
    },
    {
      firstName: 'Panda',
      lastName: 'Carrasco',
      playingPosition: 'F',
      squadNumber: '11',
    },
    {
      firstName: 'Dimitri',
      lastName: 'Gbo',
      playingPosition: 'GK',
      squadNumber: '11',
    },
  ];

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Create your Squad" uppercase />
        <form className={styles.createSquad}>
          <h1>Create a squad of players to join your team.</h1>
          <div className={styles.createSquad__squadPlayers}>
            {Array.from(
              { ...sampleList, length: getLength(sampleList, 12) },
              (player) => (
                <>
                  {player === undefined ? (
                    <SquadPlayer empty />
                  ) : (
                    <SquadPlayer data={player} />
                  )}
                </>
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
