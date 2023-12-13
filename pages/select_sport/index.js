import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Button from '../../components/Common/Button';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import SportSelect from '../../components/SportSelect';

// Icons & Images
import BpLogo from '../../public/assets/imgs/svgs/homeLogo.svg';

// Context
import { useFormData } from '../../services/context';

// Styles
import styles from './selectsport.module.scss';

export default function SelectSport() {
  const router = useRouter();
  const { setFormValues } = useFormData();

  const [sportOption, setSportOption] = useState(null);

  const handleSportOption = (item) => {
    setSportOption(item);
  };

  const onSubmit = () => {
    setFormValues({ sport: sportOption });
    router.push('/redeem_player_profile');
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningHalf">
        <section className={styles.sportSelection}>
          <div>
            <div className={styles.sportSelection__heading}>
              <Image src={BpLogo} alt="Logo" width={50} height={50} />
              <h1>Welcome to BallerProfile</h1>
            </div>
            <div className={styles.sportSelection__boxes}>
              <SportSelect
                sport="Football"
                selected={sportOption === 'Football'}
                onClick={() => handleSportOption('Football')}
              />
              <SportSelect
                sport="Basketball"
                selected={sportOption === 'Basketball'}
                onClick={() => handleSportOption('Basketball')}
              />
            </div>
          </div>
          <Button text="Select" color="blue" onClick={onSubmit} />
        </section>
      </ScreenWrapper>
    </>
  );
}
