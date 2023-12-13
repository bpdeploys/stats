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
 * @param {string} color The color of the input field (default: "black")
 *
 * @returns {React.Element} A fieldset element containing a datepicker input field
 */
const CustomDatePicker = React.forwardRef(
  ({ id, placeholder, value, onChange, color = 'black', ...props }) => {
    const CustomDatePickerInput = React.forwardRef(
      ({ value, onClick }, ref) => (
        <Input
          onClick={onClick}
          ref={ref}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={true}
          {...props}
        />
      )
    );

    return (
      <DatePicker
        selected={value || new Date()}
        onChange={onChange}
        customInput={<CustomDatePickerInput />}
      />
    );
  }
);

export default CustomDatePicker;
