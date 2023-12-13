import Image from 'next/image';

// Icons & Images
import FootballIcon from '../../public/assets/imgs/svgs/FootballIcon.svg';

// Styles
import styles from './sportselect.module.scss';

/**
 * Profile Selection component
 *
 * @param {string} sport The sport to display in the selection box
 * @param {boolean} selected Whether or not the box should be selected
 * @param {function} onClick The function to call when an item is clicked
 *
 * @returns {React.Element} A Profile Selection element
 */
const SportSelect = ({ sport, selected, onClick }) => {
  const userSelectClasses = `${styles.sportSelect} ${
    selected ? styles.selected : ''
  }`;

  return (
    <div className={userSelectClasses} onClick={onClick}>
      <Image width={30} height={30} priority src={FootballIcon} alt={sport} />
      <h3>{sport}</h3>
    </div>
  );
};

export default SportSelect;
