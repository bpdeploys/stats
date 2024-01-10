import { useRouter } from 'next/router';
import Head from 'next/head';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import ProfileSelect from '../../components/ProfileSelect';

// Data
import profileData from '../../utils/data/profiles.json';

// Styles
import styles from './selectprofile.module.scss';
import { useFormData } from '../../services/context';

export default function SelectProfile() {
  const router = useRouter();
  const { setFormValues } = useFormData();

  const handleSubmit = (value) => {
    setFormValues({ type: value.type });
    router.push('/select_sport');
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningHalf">
        <section className={styles.profileSelection}>
          <div className={styles.profileSelection__heading}>
            <img
              src="/assets/imgs/svgs/homeLogo.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <h1>Welcome to BallerProfile</h1>
          </div>
          <div className={styles.profileSelection__boxes}>
            {profileData?.profiles?.map((profile, index) => (
              <ProfileSelect
                key={index}
                data={profile}
                onClick={() => handleSubmit(profile)}
              />
            ))}
          </div>
        </section>
      </ScreenWrapper>
    </>
  );
}
