import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './playercodes.module.scss';
import CodesTable from '../../components/Squad/CodesTable';

export default function PlayerCodes() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sampleData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      code: '1234',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      code: '1234',
    },
    {
      id: 3,
      firstName: 'John',
      lastName: 'Doe',
      code: '1234',
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Doe',
      code: '1234',
    },
    {
      id: 5,
      firstName: 'John',
      lastName: 'Doe',
      code: '1234',
    },
    {
      id: 6,
      firstName: 'John',
      lastName: 'Doe',
      code: '1234',
    },
  ];

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Player Codes" uppercase />
        <div className={styles.playerCodes}>
          <h1>
            Take a screenshot and share the codes for your teammates to redeem
            their profile and points
          </h1>
          <div className={styles.playerCodes__tableWrapper}>
            <CodesTable data={sampleData} />
          </div>
          <div className={styles.playerCodes__button}>
            <Button
              text="Go To Profile"
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
