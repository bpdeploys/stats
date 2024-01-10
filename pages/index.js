import Head from 'next/head';

// Components
import ScreenWrapper from '../components/Layout/ScreenWrapper';
import Button from '../components/Common/Button';

// Styles
import styles from './index.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="blue" image="blueLightningFull">
        <section className={styles.home}>
          <div className={styles.home__logo}>
            <img
              src="/assets/imgs/home-logo.png"
              alt="Baller Logo"
              width={89}
              height={89}
            />
            <div className={styles.home__headings}>
              <h1>BallerProfile</h1>
              <h2>Baller App</h2>
            </div>
          </div>
          <div className={styles.home__buttons}>
            <Button
              text="Sign Up"
              size="small"
              customClassName={styles.home__button}
              color="white"
              href="/register"
            />
            <span className={styles.home__or}>Already have an account?</span>
            <Button
              text="Login"
              size="small"
              customClassName={styles.home__button}
              color="blue"
              href="/login"
            />
          </div>
        </section>
      </ScreenWrapper>
    </>
  );
}
