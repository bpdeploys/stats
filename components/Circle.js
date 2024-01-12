import React from "react";
import PropTypes from "prop-types";

const Circle = ({ active, text, bgActive, right, bgNoActive, ...rest }) => {
  return (
    <button type="button" {...rest}>
      <style jsx>
        {`
          button {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background-color: ${active ? bgActive : bgNoActive};
            margin-right: ${right ? "20px" : "0"};
            border: 1px solid ${active ? "#FFFFFF" : bgActive};
            color: ${active ? "#FFFFFF" : bgActive};
            transition: all 0.2s;
            ${active ? "transform: scale(1.2, 1.2)" : ""}
          }
        `}
      </style>
      {text}
    </button>
  );
};

Circle.defaultProps = {
  bgNoActive: "transparent"
};

Circle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  bgActive: PropTypes.string.isRequired,
  bgNoActive: PropTypes.string,
  right: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Circle;
