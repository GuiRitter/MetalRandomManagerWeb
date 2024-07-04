import * as type from './type';

import * as state from '../constant/state';
import { LOCAL_STORAGE_NAME } from '../constant/system';

import { getLog } from '../util/log';
import { updateLocalStorage } from '../util/persistence';

const log = getLog('flux.reducer.');

const initialState =
{
	abortMethod: null,
	data: null,
	isLoading: false,
	state: state.MENU,
	token: null
};

const reducer = (currentState = initialState, action) => { // TODO https://redux.js.org/introduction/why-rtk-is-redux-today
	log('reducer', { currentState, action });

	let nextState = Object.assign({}, currentState);

	if ((nextState.state === state.MENU) || (!nextState.token)) {
		nextState.data = null;
	}

	switch (action.type) {

		case type.ABORT_REQUEST:
			return updateLocalStorage({
				...nextState,
				abortController: null,
				isLoading: false,
			});

		case type.AUTHENTICATION:
			return updateLocalStorage({
				...nextState,
				state: state.MENU,
				token: action.token
			});

		case type.ENABLE_ABORT_REQUEST:
			return updateLocalStorage({
				...nextState,
				abortMethod: nextState.isLoading ? action.abortMethod : null
			});

		case type.GET_DONE:
		case type.GET_PAGE:
		case type.GET_PENDING_RELEASE_DATE_ALBUM:
		case type.GET_PENDING_SPOTIFY_ID:
		case type.GET_PENDING_TRACK_NUMBER:
		case type.GET_TO_DO:
			return updateLocalStorage({
				...nextState,
				data: action.data
			});

		case type.LOADING:
			return updateLocalStorage({
				...nextState,
				abortController: action.isLoading ? nextState.abortController : null,
				isLoading: action.isLoading
			});

		case type.NAVIGATION:
			return updateLocalStorage({
				...nextState,
				state: action.state
			});

		case type.POP_TO_DO:
			return updateLocalStorage({
				...nextState,
				data: nextState.data.filter(toDo => toDo.id !== action.songId)
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		case type.SET_ACTION_DATA:
			return updateLocalStorage({
				...nextState,
				data: Object.assign({}, nextState.data, {
					[action.dataName]: action.dataValue
				})
			});

		default: return nextState;
	}
};

export default reducer;
