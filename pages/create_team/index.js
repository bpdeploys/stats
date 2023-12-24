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
import styles from './createteam.module.scss';
import CreateTeamBox from '../../components/Team/CreateTeamBox';

export default function CreateTeam() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/select_profile');
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper image="grayLightningFull">
        <Header text="Create your Team" textTransform="uppercase" />
        <form className={styles.createTeam}>
          <div className={styles.createTeam__inputs}>
            <h1>Create a Team and join your sports league</h1>
            <Input placeholder="Choose a Team Name!" />
            <CreateTeamBox title="Your Sports Provider">
              <div className={styles.sportsProvider}>
                <span>Provider: Powerleague</span>
                <span>Venue: Barnet</span>
              </div>
            </CreateTeamBox>
            <CreateTeamBox title="Team Kit">
              <div className={styles.teamKit}>
                <div>
                  <span>Provider: Powerleague</span>
                  <button>Yes</button>
                </div>
                <div>
                  <span>Venue: Barnet</span>
                  <button>Yes</button>
                </div>
              </div>
            </CreateTeamBox>
          </div>
          <div className={styles.createTeam__button}>
            <Button
              text="Create Team"
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
