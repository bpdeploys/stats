import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const { data, setCreateTeamFormValues } = useCreateTeamFormData();
  const { userData, updateUserData } = useUserData();
  const [teamName, setTeamName] = useState(data.teamName || '');

  const getButtonClass = (condition) =>
    condition ? styles.buttonTrue : styles.buttonFalse;

  // Save team name in context
  useEffect(() => {
    setCreateTeamFormValues({
      teamName: teamName,
    });
  }, [teamName]);

  // Avoid selecting provider without filling team name
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!teamName) {
        toast.error('Please fill your team name first.');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup function
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [teamName, router.events]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamInformation = {
      team_name: teamName,
      // sport_entity: data?.provider?.id,
      sport_entity: 1,
      venue: 1,
      kit: data?.kitValidation,
      sport: 'Football',
      number: data?.kitSquadNumber,
    };

    try {
      const request = await createTeam(teamInformation);
      if (request) {
        toast.success('Your team has been created!');
        if (!userData?.team?.id) {
          updateUserData({ team: request });
        }
      }
      router.push('/create_squad');
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
              link={teamName ? '/select_sports_provider' : '/create_team'}
            >
              <div className={styles.sportsProvider}>
                <span>Provider: {data?.provider?.name || 'None'}</span>
                <span>Venue: {data?.provider?.venues[0]?.name || 'None'}</span>
              </div>
            </CreateTeamBox>
            <CreateTeamBox
              title="Team Kit"
              link={teamName ? '/team_kit' : '/create_team'}
            >
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
