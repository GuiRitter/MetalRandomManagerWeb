import * as type from '../type';
import * as axios from './axios';

import { API_URL, PAGE_SIZE } from '../../constant/system';

import { getUrlWithSearchParams } from '../../util/http';
import { getLog } from '../../util/log';

const log = getLog('flux.action.data.');

export const getPage = () => (dispatch, getState) => {
	const { entity, pageNumber, pageSize } = getState().reducer.data;
	log('getPage', { entity, pageNumber, pageSize });
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/${entity}/page`, { number: pageNumber, size: pageSize }),
		null,
		response => {
			const data = (response || {}).data || {};
			log('getPage', { data });
			dispatch({
				type: type.GET_PAGE,
				data: {
					count: data.count || 0,
					entity: entity,
					list: data.rows || [],
					pageNumber: pageNumber,
					pageSize: PAGE_SIZE
				}
			})
		},
		null
	));
};
