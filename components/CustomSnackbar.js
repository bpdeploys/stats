import React from 'react';

/**
 * CustomSnackbar Functional Component
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.show - Indicates whether the snackbar should be shown
 * @param {string} [props.message=''] - The message to display in the snackbar
 * @returns {React.ReactElement} Rendered component
 */
const CustomSnackbar = ({ show, message = '' }) => {
  const snackbarStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#323232',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    display: show ? 'block' : 'none',
  };

  return (
    <div style={snackbarStyle}>
      {message}
    </div>
  );
};

export default CustomSnackbar;