// Components
import Header from '../Header';

// Styles
import styles from './headerbuttons.module.scss';
import Link from 'next/link';

/**
 * Header with buttons component
 *
 * @param {string} text The text to display in the header
 * @param {boolean} logo Whether or not to display the logo (default: false)
 * @param {string} active The active button (1 or 2)
 * @param {array} links The links to display in the header
 *
 * @returns {React.Element} A Header with buttons element
 */
const HeaderButtons = ({ text, logo, active, links }) => {
  const activeColor = 'black';
  const inactiveColor = 'lightgray';

  return (
    <Header text={text} logo={logo} shadow={false} textTransform="uppercase">
      <div className={styles.headerButtons}>
        <Link
          className={styles.headerButtons__button}
          href={links[0]?.href}
          style={{ color: active === '1' ? activeColor : inactiveColor }}
        >
          {links[0]?.text}
        </Link>
        <Link
          href={links[1]?.href}
          className={styles.headerButtons__button}
          style={{ color: active === '2' ? activeColor : inactiveColor }}
        >
          {links[1]?.text}
        </Link>
      </div>
    </Header>
  );
};

export default HeaderButtons;
