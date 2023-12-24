import Image from 'next/image';
import { useRouter } from 'next/router';

// Icons & Images
import BpLogo from '../../../public/assets/imgs/svgs/homeLogo.svg';

// Styles
import styles from './header.module.scss';

/**
 * Header component
 *
 * @param {string} text The text to display in the header
 * @param {boolean} logo Whether or not to display the logo (default: false)
 * @param {boolean} uppercase Whether or not the text should be uppercase (default: false)
 * @param {boolean} shadow Whether or not the header should have a shadow (default: true)
 *
 * @returns {React.Element} A header element
 */
const Header = ({
  text,
  textTransform,
  noItalic,
  logo,
  shadow = true,
  children,
}) => {
  const router = useRouter();

  return (
    <header>
      <div
        className={styles.header}
        style={{
          boxShadow: shadow ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
        }}
      >
        {logo && (
          <Image
            className={styles.logo}
            src={BpLogo}
            alt="Baller Logo"
            width={50}
            height={50}
            onClick={() => router.push('/')}
          />
        )}
        <div
          className={styles.text}
          style={{
            textTransform: textTransform || 'none',
            fontStyle: noItalic
              ? 'normal'
              : textTransform
              ? 'italic'
              : 'normal',
          }}
        >
          {text}
        </div>
      </div>
      {children}
    </header>
  );
};

export default Header;
