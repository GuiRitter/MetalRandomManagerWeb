import * as type from './../type';
import * as axios from './axios';

import * as state from '../../constant/state';
import { API_URL, PAGE_SIZE } from '../../constant/system';

import { getLog } from '../../util/log';

const log = getLog('flux.action.index.');

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
						artistId: value.data[0].artist_id,
						artist: value.data[0].artist,
						albumId: value.data[0].album_id,
						album: value.data[0].album,
						releaseDate: value.data[0].release_date,
						releaseYear: value.data[0].release_year,
					}
				});
			}
		},
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

export const getPendingTrackNumber = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/track_number/`,
		null,
		value => {
			if (value && value.data) {
				dispatch({
					type: type.GET_PENDING_TRACK_NUMBER,
					data: {
						count: value.data.count,
						artist: {
							id: value.data.header.artist_id,
							name: value.data.header.artist_name
						},
						album: {
							id: value.data.header.album_id,
							name: value.data.header.album_name,
							releaseDate: value.data.header.release_date,
						},
						songList: value.data.songList.map(row => ({
							id: row.song_id,
							name: row.song_name,
							trackSide: row.song_track_side,
							trackNumber: row.song_track_number,
							trackIndex: row.song_track_index
						}))
					},
				});
			}
		},
		null
	))
};

export const navigate = nextState => ({
	type: type.NAVIGATION,
	state: nextState
});

export const rawInsertArtist = () => (dispatch, getState) => {
	let url = `${API_URL}/raw/artist`;

	const reducer = getState().reducer;
	const insertData = reducer.data.insertArtist;

	dispatch(axios.post(
		url,
		insertData,
		null,
		value => dispatch(setActionData('insertArtist', {
			name: '',
			output: value.data
		})),
		null
	));
};

export const rawInsertAlbum = () => (dispatch, getState) => {
	let url = `${API_URL}/raw/album`;

	const reducer = getState().reducer;
	const insertData = reducer.data.insertAlbum;

	dispatch(axios.post(
		url,
		insertData,
		null,
		value => dispatch(setActionData('insertAlbum', {
			artist: '',
			name: '',
			date: '',
			single: false,
			output: value.data
		})),
		null
	));
};

export const rawInsertSong = () => (dispatch, getState) => {
	let url = `${API_URL}/raw/song`;

	const reducer = getState().reducer;
	const insertData = reducer.data.insertSong;

	dispatch(axios.post(
		url,
		insertData,
		null,
		value => dispatch(setActionData('insertSong', {
			album: '',
			name: '',
			date: insertData.date,
			side: '',
			number: '',
			index: '',
			output: value.data
		})),
		null
	));
};

export const rawSelect = () => (dispatch, getState) => {
	let url = `${API_URL}/raw/`;

	const reducer = getState().reducer;
	const selectData = reducer.data.select;

	let parameterList = [];

	if (selectData.artist) { 
		parameterList.push('artist=' + selectData.artist);
	}

	if (selectData.album) { 
		parameterList.push('album=' + selectData.album);
	}

	if (selectData.song) { 
		parameterList.push('song=' + selectData.song);
	}

	if (parameterList.length > 0) {
		url += '?' + parameterList.join('&');
	}

	dispatch(axios.get(
		url,
		null,
		value => dispatch(setActionData('select', Object.assign({}, selectData, {
			...selectData,
			output: value.data
		}))),
		null
	));
};

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setActionData = (dataName, dataValue) => (dispatch, getState) => {
	log('setActionData', { dataName, dataValue });
	if (dataValue === getState().reducer[dataName]) {
		return;
	}
	dispatch({
		type: type.SET_ACTION_DATA,
		dataName,
		dataValue
	});
};

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

export const setTrackNumber = () => (dispatch, getState) => {
	const songList = getState().reducer.data.songList.map(song => ({
		id: song.id,
		trackSide: song.trackSide,
		trackNumber: song.trackNumber,
		trackIndex: song.trackIndex
	}));
	dispatch(axios.post(
		`${API_URL}/track_number/`,
		{ songList },
		null,
		_ => dispatch(getPendingTrackNumber()),
		null
	));
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
