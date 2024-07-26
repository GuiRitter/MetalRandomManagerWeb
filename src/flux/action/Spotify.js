import * as type from './../type';
import * as axios from './axios';

import { API_URL } from '../../constant/system';

import { buildPendingSpotifyIdRow, bySimilarity, similarity } from '../../util/data';
import { getUrlWithSearchParams } from '../../util/http';
import { getLog } from '../../util/log';

const log = getLog('flux.action.Spotify.');

export const getPendingId = () => dispatch => {
	log('getPendingId');
	dispatch(axios.get(
		`${API_URL}/Spotify/pending_id`,
		null,
		value => {
			if (value && value.data) {
				const spotifyIdRow = buildPendingSpotifyIdRow(value.data.spotifyIdRow);

				if (!spotifyIdRow) {
					return dispatch({
						type: type.GET_PENDING_SPOTIFY_ID,
						data: null
					});
				}

				let buildPendingSpotifyIdRowWithSimilarity = song => {
					let row = buildPendingSpotifyIdRow(song);

					row.similarity = similarity(spotifyIdRow.matchString, row.matchString);

					return row;
				};

				let songList = value.data.songList
					.map(buildPendingSpotifyIdRowWithSimilarity)
					.sort(bySimilarity);

				dispatch({
					type: type.GET_PENDING_SPOTIFY_ID,
					data: (value.data.length < 1) ? null : {
						spotifyIdRow: spotifyIdRow,
						songList: songList,
					}
				});
			}
		},
		null
	));
};

export const setSpotifyId = (songId, songMatchString) => (dispatch, getState) => {
	const SpotifyRow = ((((getState || (() => {}))() || {}).reducer || {}).data || {}).spotifyIdRow || {};

	const confirmResult = window.confirm(`Confirm match\n${SpotifyRow.matchString} to\n${songMatchString}`);

	if (!confirmResult) {
		return;
	}

	const SpotifyId = SpotifyRow.SpotifyId || '';

	log('setSpotifyId', { songId, SpotifyId });

	const url = getUrlWithSearchParams(`${API_URL}/Spotify/pending_id`, { songId, SpotifyId });

	dispatch(axios.post(
		url,
		null,
		null,
		_ => dispatch(getPendingId()),
		null
	));
};

export const populateSpotifyId = () => dispatch => {
	log('populateSpotifyId');

	const confirmResult = window.confirm('This will add rows in the database. Are you sure?');

	if (!confirmResult) {
		return;
	}

	dispatch(axios.post(
		`${API_URL}/Spotify/populate_pending_id`,
		null,
		null,
		_ => {},
		null
	));
};
