// Styles
import styles from './codestable.module.scss';

/**
 * Squad Codes Table component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 *
 * @returns {React.Element} A Squad Codes Table element
 */
const CodesTable = ({ data }) => {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeading}>
        <div className={styles.tableColumnPlayer}>Player</div>
        <div className={styles.tableColumnCode}>Code</div>
      </div>
      {data.map((player) => (
        <div key={player?.id} className={styles.tableBody}>
          <div className={styles.tableColumnPlayer}>
            {player?.firstName} {player?.lastName}
          </div>
          <div className={styles.tableColumnCode}>{player?.code}</div>
        </div>
      ))}
    </div>
  );
};

export default CodesTable;
