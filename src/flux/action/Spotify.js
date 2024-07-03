// import * as type from '../type';
import * as axios from './axios';

// import * as state from '../../constant/state';
import { API_URL/*, SPOTIFY_API_URL*/ } from '../../constant/system';

import { } from './data';
import { getLog } from '../../util/log';

const log = getLog('flux.action.Spotify.');

// export const getToken = () => dispatch => {
// 	log('getToken');
// 	dispatch(axios.post(
// 		SPOTIFY_API_URL,
// 		{
// 			grant_type: 'client_credentials',
// 			client_id: '',
// 			client_secret: ''
// 		},
// 		{
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			}
// 		},
// 		value => log('getToken', { value })
// 	));
// };

export const login = () => dispatch => {
	log('login');
	dispatch(axios.get(`${API_URL}/Spotify/login`));
};