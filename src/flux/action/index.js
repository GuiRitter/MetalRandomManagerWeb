import * as type from './../type';
import * as axios from './axios';

import * as state from '../../constant/state';
import { API_URL, PAGE_SIZE } from '../../constant/system';

import { } from './data';

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

export const getPendingReleaseDateAlbum = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/release_date/`,
		null,
		value => {
			if (value && value.data) {
				dispatch({
					type: type.GET_PENDING_RELEASE_DATE_ALBUM,
					data: value.data.length < 1 ? null : {
						id: value.data[0].id,
						artist: value.data[0].artist,
						album: value.data[0].album,
						releaseDate: value.data[0].release_date,
						releaseYear: value.data[0].release_year,
					}
				});
			}
		},
		null
	))
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

export const setReleaseDate = () => (dispatch, getState) => {
	const album = getState().reducer.data;
	dispatch(axios.post(
		`${API_URL}/release_date/`,
		{
			albumId: album.id,
			releaseDate: album.releaseDate,
			releaseYear: album.releaseYear
		},
		null,
		_ => dispatch(getPendingReleaseDateAlbum()),
		null
	));
};

export const setActionData = (dataName, dataValue) => (dispatch, getState) => {
	if (dataValue === getState().reducer[dataName]) {
		return;
	}
	dispatch({
		type: type.SET_ACTION_DATA,
		dataName,
		dataValue
	});
};

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

export const showArtist = () => dispatch => {
	dispatch(navigate(state.READ));
	dispatch({
		type: type.GET_PAGE,
		data: {
			count: 0,
			entity: 'artist',
			list: [],
			pageNumber: 0,
			pageSize: PAGE_SIZE
		}
	});
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
