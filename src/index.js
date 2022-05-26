import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; // TODO
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import reducer from './flux/reducer';

/**
 * https://github.com/zalmoxisus/redux-devtools-extension
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createRootReducer = () => combineReducers({
	reducer,
});

const store = createStore(
	createRootReducer(), // root reducer with router state
	composeEnhancers(
		applyMiddleware(
			thunk
		)
	)
);

ReactDOM.render(
	<Provider store={store}><React.StrictMode><App /></React.StrictMode></Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
