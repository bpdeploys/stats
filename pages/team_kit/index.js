import Head from 'next/head';
import { useState } from 'react';
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
import styles from './teamkit.module.scss';
import Toggle from '../../components/Common/Toggle';
import ColorPicker from '../../components/Common/ColorPicker';

export default function TeamKit() {
  const [toggleStates, setToggleStates] = useState({
    kitValidation: true,
    kitSquadNumber: false,
    color2: true,
    color3: false,
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleToggleChange = (toggleId, event) => {
    const newState = event.target.checked;
    setToggleStates((prev) => ({ ...prev, [toggleId]: newState }));
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightning" positionY="450px">
        <Header text="Team Kit" textTransform="uppercase" noItalic />
        <div className={styles.teamkit}>
          <div className={styles.teamkit__question}>
            <h3>Does your team have a its own kit?</h3>
            <Toggle
              id="kitValidation"
              checked={toggleStates.kitValidation}
              onChange={(event) => handleToggleChange('kitValidation', event)}
              label="Kit Validation"
            />
          </div>
          <div className={styles.teamkit__question}>
            <h3>Does the kit have squad numbers?</h3>
            <Toggle
              id="kitSquadNumber"
              checked={toggleStates.kitSquadNumber}
              onChange={(event) => handleToggleChange('kitSquadNumber', event)}
              label="Kit Squad Number"
            />
          </div>
          <div className={styles.teamkit__teamColours}>
            <h2>Pick Team Colours</h2>
            <div className={styles.teamColourPicker}>
              <span>Primary colour</span>
              <ColorPicker />
            </div>
            <div className={styles.teamColourPicker}>
              <Toggle
                id="color2"
                checked={toggleStates.color2}
                onChange={(event) => handleToggleChange('color2', event)}
                label="Secondary colour"
              />
              <span>Secondary colour</span>
              <ColorPicker disabled={!toggleStates.color2} />
            </div>
            <div className={styles.teamColourPicker}>
              <Toggle
                id="color3"
                checked={toggleStates.color3}
                onChange={(event) => handleToggleChange('color3', event)}
                label="Third colour"
              />
              <span>Third colour</span>
              <ColorPicker disabled={!toggleStates.color3} />
            </div>
          </div>
          <div className={styles.teamkit__button}>
            <Button text="DONE" color="blue" uppercase onClick={handleSubmit} />
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
}
