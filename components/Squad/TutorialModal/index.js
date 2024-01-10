// Styles
import styles from './tutorialmodal.module.scss';

/**
 * Squad creation tutorial modal
 *
 * @returns {React.Element} A modal that explains how to use the squad creation page
 */
const SquadCreationTutorial = () => {
  return (
    <div className={styles.modal}>
      <img
        className={styles.modal__arrow}
        src="/assets/imgs/svgs/TopLeftArrow.svg"
        width={70}
        height={70}
      />
      <div className={styles.modal__box}>
        <h3>Squad Icons</h3>
        <ol>
          <li>Squad Icons are clickable</li>
          <li>
            Click on your squad icon to add your <b>squad number!</b>
          </li>
          <li>
            <span>Squad numbers</span>{' '}
            {'are how referees at <<Sports Provider>>'}
            <br />
            attribute actions like goals, assists & fouls to your profile.
            <br />
            This way you receive all the points for your performances.
          </li>
          <li>Click on other squad icons to create and invite teammates.</li>
        </ol>
      </div>
    </div>
  );
};

export default SquadCreationTutorial;
