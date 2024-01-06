// Styles
import Link from 'next/link';
import styles from './button.module.scss';

/**
 * Button component
 *
 * @param {string} text The text of the button
 * @param {string} type The type of the button (e.g. "submit", "reset", "button")
 * @param {function} onClick The function to be called when the button is clicked
 * @param {string} color The color of the button (default: #FFF)
 * @param {string} size The size of the button (default: 'large')
 * @param {boolean} disabled Whether or not the button is disabled (default: false)
 *
 * @returns {React.Element} A button element
 */
const Button = ({
  text,
  type,
  onClick,
  href,
  color = '#FFF',
  size = 'large',
  disabled,
  customClassName,
}) => {
  const colors = {
    blue: '#125B9F',
    lightBlue: '#3280C8',
    white: '#FFF',
  };

  const buttonColor = colors[color];

  return href ? (
    <Link
      type={type}
      href={href}
      style={{
        background: buttonColor,
        color: color === 'white' ? '#000' : '#FFF',
        height: size === 'small' ? '40px' : '50px',
      }}
      className={customClassName || styles.button}
    >
      {text}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? 'lightgray' : buttonColor,
        color: disabled ? 'gray' : color === 'white' ? '#000' : '#FFF',
        height: size === 'small' ? '40px' : '50px',
      }}
      className={customClassName || styles.button}
    >
      {text}
    </button>
  );
};

export default Button;
