import React, { useState, useRef, useEffect } from 'react';
import styles from './colorpicker.module.scss';
import { pickTextColorBasedOnBgColorAdvanced } from '../../../utils/functions';

/**
 * A color picker component that allows users to select a color.
 *
 * @returns {JSX.Element} The color picker component.
 */
export default function ColorPicker({ disabled, defaultColor }) {
  const [color, setColor] = useState(defaultColor || '#FFFFFF');
  const [textColor, setTextColor] = useState('#000000'); // Initial text color
  const colorInputRef = useRef(null);

  useEffect(() => {
    // Update the text color based on the background color
    setTextColor(
      pickTextColorBasedOnBgColorAdvanced(color, '#FFFFFF', '#000000')
    );

    if (disabled) {
      setColor('#ffffff');
    }
  }, [disabled, color]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleTextClick = () => {
    colorInputRef.current.click();
  };

  return (
    <div className={styles.colorPicker}>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className={styles.colorInput}
        ref={colorInputRef}
        disabled={disabled}
      />
      {!disabled && (
        <small onClick={handleTextClick} style={{ color: textColor }}>
          pick colour
        </small>
      )}
    </div>
  );
}
