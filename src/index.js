import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './App';
import './index.css';

import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(reduxThunk,createLogger())(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
