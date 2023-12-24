// Styles
import styles from './createteambox.module.scss';
import Link from 'next/link';

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *
 * @returns {React.Element} A Squad teammate info element
 */
const CreateTeamBox = ({ title, link, children }) => {
  return (
    <div className={styles.createTeamBox}>
      <h3>{title}</h3>
      <div className={styles.createTeamBox__content}>{children}</div>
      <Link href={link || '/'} className={styles.createTeamBox__link}>
        EDIT
      </Link>
    </div>
  );
};

export default CreateTeamBox;
