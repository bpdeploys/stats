import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import CustomSnackbar from './components/CustomSnackbar';

export const Context = React.createContext();

export const { Provider } = Context;

export const MATCH_ACTIVE_KEY = 'MATCH_ACTIVE_KEY';

const DynamicProvider = ({ children, db }) => {
  const [state, setState] = useState({
    [MATCH_ACTIVE_KEY]: {},
    toastText: '',
    Show: false,
    Showing: false,
    storage: db,
  });

  const setActiveMatch = (args, callback) =>
    setState({ ...state, ...args }, callback);

  const showToast = (toastText) => {
    if (state.Showing) return;
    setState({ ...state, toastText, Show: true, Showing: true });
    setTimeout(() => {
      setState({ ...state, Show: false, Showing: false });
    }, 2000);
  };

  useEffect(() => {
    setState({ ...state, setActiveMatch, showToast });
  }, []); // Empty array ensures this effect runs only once, similar to componentDidMount

  const { Show, toastText } = state;

  return (
    <React.Fragment>
      <Provider value={{ ...state, setActiveMatch, showToast }}>
        {children}
      </Provider>
      <CustomSnackbar show={Show} message={toastText} />
    </React.Fragment>
  );
};

DynamicProvider.propTypes = {
  children: PropTypes.node.isRequired,
  db: PropTypes.object.isRequired,
};

export const withContext = (WrappedComponent) => {
  return React.forwardRef((props, ref) => (
    <Context.Consumer>
      {(propsConsumer) => (
        <WrappedComponent {...propsConsumer} {...props} ref={ref} />
      )}
    </Context.Consumer>
  ));
};

export default DynamicProvider;
