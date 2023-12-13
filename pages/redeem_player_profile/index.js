import Head from 'next/head';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';
import HeaderButtons from '../../components/Layout/HeaderButtons';

// Styles
import styles from './redeemplayerprofile.module.scss';
import VerificationInput from 'react-verification-input';

export default function RedeemPlayerProfile() {
  const links = [
    { href: '/redeem_player_profile', text: 'Redeem Account' },
    { href: '/create_player_profile', text: 'Create Account' },
  ];

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <HeaderButtons text="Player Profile" links={links} active="1" />
        <div className={styles.redeemPlayerProfile}>
          <div className={styles.redeemPlayerProfile__inputs}>
            <h1>
              Type the code Player Code below to redeem your pre-made account!
            </h1>
            <VerificationInput
              placeholder=""
              validChars="0-9"
              inputProps={{ inputMode: 'numeric' }}
              length={4}
              classNames={{
                container: styles.verificationContainer,
                character: styles.verificationContainer__character,
                characterInactive:
                  styles.verificationContainer__characterInactive,
                characterSelected:
                  styles.verificationContainer__characterSelected,
              }}
            />
          </div>
          <div className={styles.redeemPlayerProfile__button}>
            <Button
              text="Create Profile"
              color="blue"
              uppercase
              type="submit"
            />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}
