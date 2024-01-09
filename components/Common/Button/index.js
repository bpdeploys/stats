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
  type = 'button',
  onClick,
  href,
  color = 'white',
  size = 'large',
  disabled = false,
  customClassName,
  uppercase,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`color-${color}`],
    styles[`size-${size}`],
    customClassName,
    disabled ? styles.disabled : '',
    uppercase ? styles.uppercase : '',
  ].join(' ');

  if (href) {
    return (
      <Link href={href} type={type} className={buttonClasses} {...props}>
        {text}
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses}
        {...props}
      >
        {text}
      </button>
    );
  }
};

export default Button;
