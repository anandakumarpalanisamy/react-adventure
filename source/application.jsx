/**
 * React Adventure
 * @author Marcos Gonçalves <contact@themgoncalves.com>
 * @version 2.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { history } from 'services';
import Root from 'screens/root';

// Import styles
import 'styles/reset.scss';
import 'styles/responsive-grid.scss';
import 'styles/base.scss';

import './service-worker.register';
import configureStore from './app/store';
import rootSaga from './app/sagas';

const store = configureStore(history);
store.runSaga(rootSaga);

ReactDOM.render(
  <Root
    store={store}
    history={history}
  />
  , document.getElementById('react-app'),
);
