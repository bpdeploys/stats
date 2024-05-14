const Toggle = ({
  id,
  checked,
  onChange,
  label = 'Toggle',
  className = '',
  style = {},
  showText = true,
  yesText = 'Yes',
  noText = 'No',
}) => {
  const handleSpanClick = () => {
    const event = { target: { checked: !checked } };
    onChange(event);
  };

  return (
    <div className={`toggleSwitch ${className}`} style={style}>
      <input
        type="checkbox"
        id={id}
        className="toggleSwitch__checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        onClick={handleSpanClick}
      />
      <label
        htmlFor={id}
        className="toggleSwitch__label"
        onClick={handleSpanClick}
      >
        {label}
      </label>
      {showText && (
        <span
          onClick={handleSpanClick}
          className={
            checked ? 'toggleSwitch__checked' : 'toggleSwitch__unchecked'
          }
        >
          {checked ? yesText : noText}
        </span>
      )}
      <style jsx>{`
        .team-switch {
          .toggleSwitch__label {
            background: #e5e5e5;
          }

          .toggleSwitch__checkbox:checked + .toggleSwitch__label:after {
            background: #125b9f;
          }
        }
        .toggleSwitch {
          position: relative;
          width: fit-content;
        }
        .toggleSwitch__checkbox {
          height: 0;
          width: 0;
          visibility: hidden;
          display: none;
        }
        .toggleSwitch__checked,
        .toggleSwitch__unchecked {
          position: absolute;
          top: 50%;
          font-size: 12px;
          cursor: pointer;
          transform: translateY(-50%);
        }
        .toggleSwitch__checked {
          left: 15%;
        }
        .toggleSwitch__unchecked {
          left: 45%;
          width: 28px;
          text-align: right;
        }
        .toggleSwitch__label {
          cursor: pointer;
          text-indent: -9999px;
          width: 66px;
          height: 25px;
          background: #fff;
          display: block;
          border-radius: 100px;
          position: relative;
          transition: 0.3s;
        }
        .toggleSwitch__label:after {
          content: '';
          position: absolute;
          top: 5px;
          left: 5px;
          width: 16px;
          height: 16px;
          background: #000;
          border-radius: 90px;
          transition: 0.3s;
        }
        .toggleSwitch__label:active:after {
          width: 25px;
        }
        .toggleSwitch__checkbox:checked + .toggleSwitch__label:after {
          background: #125b9f;
        }
        .toggleSwitch__checkbox:checked + .toggleSwitch__label:after {
          left: calc(100% - 5px);
          transform: translateX(-100%);
        }
      `}</style>
    </div>
  );
};

export default Toggle;
