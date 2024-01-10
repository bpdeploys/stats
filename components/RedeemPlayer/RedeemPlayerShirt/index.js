// Styles
import styles from './redeemplayershirt.module.scss';

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *
 * @returns {React.Element} A Squad teammate info element
 */
const RedeemPlayerShirt = ({ data, size }) => {
  return (
    <div
      className={
        size === 'big' ? styles.redeemPlayerShirtBig : styles.redeemPlayerShirt
      }
    >
      <div className={styles.imageWrapper}>
        <img
          width={size === 'big' ? 300 : 100}
          height={size === 'big' ? 350 : 116}
          priority
          src="/assets/imgs/svgs/blue-shirt.svg"
          alt={data?.id || 'Blue Player Shirt'}
        />
        <span className={styles.squadNumber}>{data?.squadNumber}</span>
        {data?.playingPosition && (
          <span
            className={
              data.playingPosition === 'GK'
                ? styles.playingPositionGk
                : styles.playingPosition
            }
          >
            {data?.playingPosition}
          </span>
        )}
      </div>
    </div>
  );
};

export default RedeemPlayerShirt;
