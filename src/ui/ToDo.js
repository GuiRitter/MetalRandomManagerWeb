import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getToDo, navigate, setStep } from '../flux/action/index';
import * as state from '../constant/state';
import * as step from '../constant/step';

import { buildCell, buildRow, buildTable } from '../util/html';

import { getLog } from '../util/log';

const log = getLog('ToDo.');

function ToDo(props) {

	const dispatch = useDispatch();

	const toDoList = useSelector(state => ((state || {}).reducer || {}).data) || [];

	log('ToDo', { toDoList });

	let rowList = [
		buildRow('title', buildCell('title', <h1>To Do</h1>, { colSpan: 9 })),
		buildRow(
			'header',
			buildCell('step', 'Step'),
			buildCell('song', 'Song'),
			buildCell('artist', 'Artist'),
			buildCell('album', 'Album'),
			buildCell('release_date', 'Release date'),
			buildCell('registered_at', 'Registered at'),
			buildCell('download_button', ''),
			buildCell('done_button', ''),
			buildCell('not_selected_button', '')
		)
	];

	rowList = rowList.concat(toDoList.map((toDo, index) => buildRow(
		`to_do_${index}`,
		buildCell(`step_${index}`, toDo.step),
		buildCell(`song_${index}`, toDo.song),
		buildCell(`artist_${index}`, toDo.artist),
		buildCell(`album_${index}`, toDo.album),
		buildCell(`release_date_${index}`, toDo.release_date),
		buildCell(`registered_at_${index}`, toDo.registered_at),
		buildCell(`download_button_${index}`, <button
			onClick={() => dispatch(setStep(toDo.song, toDo.id, step.TO_DOWNLOAD))}
			type='submit'
		>To download</button>),
		buildCell(`done_button_${index}`, <button
			onClick={() => dispatch(setStep(toDo.song, toDo.id, step.DONE))}
			type='submit'
		>To done</button>),
		buildCell(`not_selected_button_${index}`, <button
			onClick={() => dispatch(setStep(toDo.song, toDo.id, step.NOT_SELECTED))}
			type='submit'
		>To not selected</button>)
	)));

	rowList = rowList.concat([buildRow('refresh', buildCell('refresh', <button
		onClick={() => dispatch(getToDo())}
		type='submit'
	>Refresh</button>, { colSpan: 9 })),
	buildRow('back', buildCell('back', <button
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Back</button>, { colSpan: 9 }))]);

	return buildTable(rowList);
}

export default ToDo;
