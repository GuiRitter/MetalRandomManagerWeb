import * as type from './../type';
import * as axios from './axios';

// import * as state from '../../constant/state';
import { API_URL } from '../../constant/system';

import { buildPendingSpotifyIdRow } from '../../util/data';
import { getLog } from '../../util/log';

const fuzzy = require('fuzzy');

const log = getLog('flux.action.Spotify.');

export const getPendingId = () => dispatch => {
	log('getPendingId');
	dispatch(axios.get(
		`${API_URL}/Spotify/pending_id`,
		null,
		value => {
			if (value && value.data) {
				const spotifyIdRow = buildPendingSpotifyIdRow(value.data.spotifyIdRow);

				let songList = value.data.songList.map(buildPendingSpotifyIdRow);

				const results = fuzzy.filter(spotifyIdRow.matchString, songList, {
					extract: element => element.matchString,
				});

				songList = results.map(result => result.original);

				dispatch({
					type: type.GET_PENDING_SPOTIFY_ID,
					data: value.data.length < 1 ? null : {
						spotifyIdRow: spotifyIdRow,
						songList: songList,
					}
				});
			}
		},
		null
	))
};

export const setSpotifyId = () => dispatch => {
	// TODO
	alert('not implemented');
};
