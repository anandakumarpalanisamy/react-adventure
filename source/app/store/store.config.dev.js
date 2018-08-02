/**
 * React Adventure
 * @author Marcos Gonçalves <contact@themgoncalves.com>
 * @version 2.2.0
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers';

// Mock function
/* eslint-disable func-names */
const mock = (fn) => {
  let returnValue;
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, args);
    }
    return returnValue;
  };
};
/* eslint-enable func-names */

/* eslint-disable global-require */
export default function configureStore(history, initialState = {}) {
  // Insert mocked function to avoid redux erros on safari
  /* eslint-disable no-underscore-dangle */
  const reduxDevTools = (window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : mock);
    /* eslint-enable no-underscore-dangle */

  const sagaMiddleware = typeof createSagaMiddleware === 'function' ? createSagaMiddleware() : createSagaMiddleware.default();

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        createLogger(),
      ),
      reduxDevTools && reduxDevTools,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
/* eslint-enable global-require */
