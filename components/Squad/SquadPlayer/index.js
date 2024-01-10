// Styles
import styles from './sportselect.module.scss';
import Link from 'next/link';
import { abbreviatePosition } from '../../../utils/functions';

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *@param {boolean} disabled Whether or not the element should be disabled
 *
 * @returns {React.Element} A Squad teammate info element
 */
const SquadPlayer = ({ data, empty, disabled }) => {
  return empty ? (
    <Link href={disabled ? '/create_squad' : '/create_teammate'}>
      <div
        className={styles.squadPlayer}
        style={{
          filter: disabled ? 'blur(2px)' : 'none',
        }}
      >
        <div className={styles.squadPlayer__imageWrapper}>
          <img
            width={70}
            height={80}
            priority
            src="/assets/imgs/svgs/gray-shirt.svg"
            alt="Gray Player Shirt"
          />
        </div>
        <small>{data?.lastName}</small>
        <h3>{data?.firstName}</h3>
      </div>
    </Link>
  ) : (
    <div className={styles.squadPlayer}>
      <div className={styles.squadPlayer__imageWrapper}>
        <img
          width={70}
          height={80}
          priority
          src="/assets/imgs/svgs/blue-shirt.svg"
          alt={data?.id || 'Blue Player Shirt'}
        />
        <span className={styles.squadNumber}>{data?.squadNumber}</span>
        <span
          className={
            data.playingPosition === 'Goalkeeper'
              ? styles.playingPositionGk
              : styles.playingPosition
          }
        >
          {abbreviatePosition(data?.playingPosition)}
        </span>
      </div>
      <small>{data?.lastName}</small>
      <h3>{data.firstName}</h3>
    </div>
  );
};

export default SquadPlayer;
