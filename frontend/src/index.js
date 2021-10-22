import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//  - REDUX
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer, { initialState } from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

//ss

const thunkMiddleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...thunkMiddleware))
); // erroring composeWithDevTolls after applyMidlleware

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
