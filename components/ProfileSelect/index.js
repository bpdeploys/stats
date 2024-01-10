// Components
import Button from '../Common/Button';

// Styles
import styles from './profileselect.module.scss';

/**
 * Profile Selection component
 *
 * @param {object} data The data to display in the box
 * @param {function} onClick The function to call when an item is clicked
 *
 * @returns {React.Element} A Profile Selection element
 */
const ProfileSelect = ({ data, onClick }) => {
  const { title, available, list, color } = data;

  return (
    <div
      className={styles.profileSelect}
      style={{ background: color === 'red' ? '#A91337' : '#1361A9' }}
    >
      <img
        className={styles.profileSelect__image}
        src="/assets/imgs/svgs/blue-shirt.svg"
        alt="Player Shirt"
        width={60}
        height={68}
      />
      <div>
        <h3>{title}</h3>
        <ul>
          {list?.map((item, index) => (
            <li key={index}>{item.description}</li>
          ))}
        </ul>
      </div>
      <Button
        text={available ? 'Select' : 'Not yet available'}
        color="white"
        onClick={onClick}
        disabled={!available}
      />
    </div>
  );
};

export default ProfileSelect;
