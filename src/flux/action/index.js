import * as type from './../type';
import * as axios from './axios';

import { API_URL } from '../../constant/system';

export const getDone = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/music/list`,
		null,
		value => dispatch({
			type: type.GET_DONE,
			data: value.data
		}),
		null
	));
};

export const getToDo = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/to_do/list`,
		null,
		value => dispatch({
			type: type.GET_TO_DO,
			data: value.data
		}),
		null
	));
};

export const navigate = nextState => ({
	type: type.NAVIGATION,
	state: nextState
});

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setStep = (songName, songId, newStep) => dispatch => {
	if (!window.confirm(`Confirm set song\n${songName}\nstep to\n${newStep.description}?`)) {
		return;
	}
	dispatch(axios.post(
		`${API_URL}/to_do/step`,
		{ songId, newStep: newStep.code },
		null,
		value => dispatch({
			type: type.POP_TO_DO,
			songId
		}),
		null
	));
};

export const signIn = (login, password) => dispatch => {
	dispatch(axios.post(
		`${API_URL}/user/sign_in`,
		{ login, password },
		null,
		value => {
			if (!value) {
				alert('log in failed');
				return;
			}
			let data = value.data;
			if (!data) {
				alert('log in failed');
				return;
			}
			data = data.data;
			if (!data) {
				alert('log in failed');
				return;
			}
			let token = data.token;
			if (!token) {
				alert('log in failed');
				return;
			}
			dispatch({
				type: type.AUTHENTICATION,
				token
			})
		},
		null
	));
};

export const signOut = () => ({
	type: type.AUTHENTICATION,
	token: null
});
