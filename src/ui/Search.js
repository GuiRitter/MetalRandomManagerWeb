import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDone, navigate } from '../flux/action/index';
import * as state from '../constant/state';

import { buildCell, buildRow, buildTable } from '../util/html';

import { getLog } from '../util/log';

const log = getLog('Search.');

function Search(props) {

	const dispatch = useDispatch();

	const doneList = useSelector(state => ((state || {}).reducer || {}).data) || [];

	log('Search', { doneList });

	let rowList = [
		buildRow('title', buildCell('title', <h1>The playlist</h1>, { colSpan: 5 })),
		buildRow(
			'header',
			buildCell('artist', 'Artist'),
			buildCell('song', 'Song'),
			buildCell('album', 'Album'),
			buildCell('release_date', 'Release date'),
			buildCell('registered_at', 'Registered at')
		)
	];

	rowList = rowList.concat(doneList.map((toDo, index) => buildRow(
		`done_${index}`,
		buildCell(`artist_${index}`, toDo.artist),
		buildCell(`song_${index}`, toDo.song),
		buildCell(`album_${index}`, toDo.album),
		buildCell(`release_date_${index}`, toDo.release_date),
		buildCell(`registered_at_${index}`, toDo.registered_at)
	)));

	rowList = rowList.concat([buildRow('refresh', buildCell('refresh', <button
		onClick={() => dispatch(getDone())}
		type='submit'
	>Refresh</button>, { colSpan: 5 })),
	buildRow('back', buildCell('back', <button
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Back</button>, { colSpan: 5 }))]);

	return buildTable(rowList);
}

export default Search;
