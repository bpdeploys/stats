import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import CreateTeamBox from '../../components/Team/CreateTeamBox';

// Styles
import styles from './createteam.module.scss';

// Context
import { useUserData } from '../../context/UserContext';
import { useCreateTeamFormData } from '../../context/TeamContext';

// API
import { createTeam } from '../../services/api';

export default function CreateTeam() {
  const router = useRouter();
  const { data } = useCreateTeamFormData();
  const { userData } = useUserData();
  const [teamName, setTeamName] = useState('');

  console.log(data);

  const getButtonClass = (condition) =>
    condition ? styles.buttonTrue : styles.buttonFalse;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamInformation = {
      team_name: teamName,
      sport_entity: data?.provider?.id,
      venue: 1,
      kit: data?.kitValidation,
      sport: 'Football',
      number: 42,
    };

    try {
      const request = await createTeam(teamInformation);
      if (request) {
        toast.success('Your profile has been created!');
        router.push('/create_team');
      }
      router.push('/select_profile');
    } catch (error) {
      toast.error(error.message);
    }
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
            <Input
              placeholder="Choose a Team Name!"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <CreateTeamBox
              title="Your Sports Provider"
              link="/select_sports_provider"
            >
              <div className={styles.sportsProvider}>
                <span>Provider: {data?.provider?.name}</span>
                <span>Venue: Barnet</span>
              </div>
            </CreateTeamBox>
            <CreateTeamBox title="Team Kit" link="team_kit">
              <div className={styles.teamKit}>
                <div>
                  <span>Kit</span>
                  <button className={getButtonClass(data?.kitValidation)}>
                    {data?.kitValidation ? 'Yes' : 'No'}
                  </button>
                </div>
                <div>
                  <span>Shirt Numbers</span>
                  <button className={getButtonClass(data?.kitSquadNumber)}>
                    {data?.kitSquadNumber ? 'Yes' : 'No'}
                  </button>
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
