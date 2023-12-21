import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Components
import Input from '../Input';

/**
 * Date Picker component
 *
 * @param {string} id The unique identifier of the input field
 * @param {string} placeholder The placeholder text of the input field
 * @param {string} value The initial value of the input field
 * @param {function} onChange The function to be called when the value of the input field changes
 * @param {string} tooltipText The tooltip text of the input field
 * @param {string} color The color of the input field (default: "black")
 *
 * @returns {React.Element} A fieldset element containing a datepicker input field
 */
const CustomDatePicker = React.forwardRef(
  (
    {
      id,
      placeholder,
      value,
      onChange,
      tooltipText,
      color = 'black',
      ...props
    },
    ref
  ) => {
    const CustomDatePickerInput = React.forwardRef(
      ({ value, onClick }, inputRef) => {
        // Determine display value - use placeholder if value is not set
        const displayValue = value ? value : placeholder;

        return (
          <Input
            id={id}
            color={color}
            onClick={onClick}
            ref={inputRef}
            value={displayValue}
            placeholder={placeholder}
            tooltipText={tooltipText}
            onChange={onChange}
            readOnly={true}
            {...props}
          />
        );
      }
    );

    return (
      <DatePicker
        selected={value || null} // Set to null when no value to ensure placeholder is displayed
        onChange={onChange}
        customInput={
          <CustomDatePickerInput
            ref={ref}
            placeholder={placeholder}
            tooltipText={tooltipText}
          />
        }
      />
    );
  }
);

export default CustomDatePicker;
