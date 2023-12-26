// Styles
import styles from './sportselect.module.scss';
import blueShirt from '../../../public/assets/imgs/svgs/blue-shirt.svg';
import grayShirt from '../../../public/assets/imgs/svgs/gray-shirt.svg';
import Image from 'next/image';
import Link from 'next/link';
import { abbreviatePosition } from '../../../utils/functions';

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *
 * @returns {React.Element} A Squad teammate info element
 */
const SquadPlayer = ({ data, empty }) => {
  return empty ? (
    <Link href="/create_teammate">
      <div className={styles.squadPlayer}>
        <div className={styles.squadPlayer__imageWrapper}>
          <Image
            width={70}
            height={80}
            priority
            src={grayShirt}
            alt={'Gray Player Shirt'}
          />
        </div>
        <small>{data?.lastName}</small>
        <h3>{data?.firstName}</h3>
      </div>
    </Link>
  ) : (
    <div className={styles.squadPlayer}>
      <div className={styles.squadPlayer__imageWrapper}>
        <Image
          width={70}
          height={80}
          priority
          src={blueShirt}
          alt={data?.id || 'Blue Player Shirt'}
        />
        <span className={styles.squadNumber}>{data?.squadNumber}</span>
        <span
          className={
            data.playingPosition === 'GK'
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
