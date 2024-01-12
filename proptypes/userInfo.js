import PropTypes from "prop-types";

export default {
  id: PropTypes.number,
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    profile_pic: PropTypes.string
  })
};
