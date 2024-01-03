import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Button from '../../components/Common/Button';

// Styles
import styles from './teamkit.module.scss';
import Toggle from '../../components/Common/Toggle';
import ColorPicker from '../../components/Common/ColorPicker';
import CustomShirt from '../../components/Common/CustomShirt';
import { useCreateTeamFormData } from '../../context/TeamContext';

const DEFAULT_COLORS = {
  primary: '#ffffff',
  secondary: '#125B9F',
  third: null,
};

export default function TeamKit() {
  const router = useRouter();
  const { data, setCreateTeamFormValues } = useCreateTeamFormData();

  const initializeState = (data) => ({
    kitValidation: data?.kitValidation ?? true,
    kitSquadNumber: data?.kitSquadNumber ?? false,
    color2: data?.enabledColors?.secondary ?? true,
    color3: data?.enabledColors?.third ?? false,
  });
  

  const [toggleStates, setToggleStates] = useState(initializeState(data));
  const [colors, setColors] = useState({ ...DEFAULT_COLORS, ...data?.colors });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreateTeamFormValues({
        colors,
        enabledColors: {
          secondary: toggleStates.color2,
          third: toggleStates.color3,
        },
        kitValidation: toggleStates.kitValidation,
        kitSquadNumber: toggleStates.kitSquadNumber,
      });
      await router.push('/create_team');
    } catch (error) {
      console.error('Error saving data or navigating:', error);
    }
  };

  const handleToggleChange = (toggleId, event) => {
    const newState = event.target.checked;
    setToggleStates((prev) => ({ ...prev, [toggleId]: newState }));

    // Reset color to white when the toggle is turned off
    if (!newState) {
      setColors((prevColors) => {
        if (toggleId === 'color2') {
          return { ...prevColors, secondary: '#125B9F' };
        } else if (toggleId === 'color3') {
          return { ...prevColors, third: '#ffffff' };
        }
        return prevColors;
      });
    }
  };

  const handleColorChange = (colorId, colorValue) => {
    setColors((prevColors) => ({ ...prevColors, [colorId]: colorValue }));
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
          <div className={styles.teamkit__shirt}>
            <CustomShirt
              shirtColor={colors.primary}
              backgroundColor={colors.secondary}
              numberColor={colors.third}
              number={toggleStates.kitSquadNumber ? '10' : null}
            />
          </div>
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
            <h2>Select Your Teams colours...</h2>
            <div className={styles.teamColourPicker}>
              <span>Primary colour</span>
              <ColorPicker
                defaultColor={data?.colors?.primary || '#FFFFFF'}
                onChange={(color) => handleColorChange('primary', color)}
              />
            </div>
            <div className={styles.teamColourPicker}>
              <Toggle
                id="color2"
                checked={toggleStates.color2}
                onChange={(event) => handleToggleChange('color2', event)}
                label="Secondary colour"
              />
              <span>Secondary colour</span>
              <ColorPicker
                defaultColor={data?.colors?.secondary || '#125B9F'}
                onChange={(color) => handleColorChange('secondary', color)}
                disabled={!toggleStates.color2}
              />
            </div>
            <div className={styles.teamColourPicker}>
              <Toggle
                id="color3"
                checked={toggleStates.color3}
                onChange={(event) => handleToggleChange('color3', event)}
                label="Third colour"
              />
              <span>Third colour</span>
              <ColorPicker
                defaultColor={data?.colors?.third || '#FFFFFF'}
                onChange={(color) => handleColorChange('third', color)}
                disabled={!toggleStates.color3}
              />
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
