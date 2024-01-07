import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { navigate, getPendingReleaseDateAlbum, setActionData, setReleaseDate } from '../flux/action/index';
import * as state from '../constant/state';

import { buildCell, buildRow, buildTable } from '../util/html';

let releaseDateField = null;
let releaseYearField = null;

function componentDidMount(props, releaseDate, releaseYear) {
	if (releaseDateField && (releaseDateField.value !== releaseDate)) {
		releaseDateField.value = releaseDate;
	}
	if (releaseYearField && (releaseYearField.value !== releaseYear)) {
		releaseYearField.value = releaseYear;
	}
}

function componentDidUpdate(props, prevProps, releaseDate, releaseYear) {
	componentDidMount(props, releaseDate, releaseYear);
}

function PendingReleaseDate(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	const pendingReleaseDateAlbum = useSelector(state => ((state || {}).reducer || {}).data) || {};

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, null, pendingReleaseDateAlbum.releaseDate || '', pendingReleaseDateAlbum.releaseYear || '');
		} else {
			didMountRef.current = true;
			componentDidMount(props, pendingReleaseDateAlbum.releaseDate || '', pendingReleaseDateAlbum.releaseYear || '');
		}
	});

	return buildTable(
		buildRow('refresh', buildCell('refresh', <button
			onClick={() => dispatch(getPendingReleaseDateAlbum())}
			type='submit'
		>Refresh</button>, { colSpan: 2 })),
		buildRow(
			'artistRow',
			buildCell('artistLabel', 'Artist'),
			buildCell('artistField', pendingReleaseDateAlbum.artist || '')
		),
		buildRow(
			'albumRow',
			buildCell('albumLabel', 'Album'),
			buildCell('albumField', pendingReleaseDateAlbum.album || '')
		),
		buildRow(
			'ReleaseYearRow',
			buildCell('ReleaseYearLabel', 'Release year'),
			buildCell('ReleaseYearField', <input
				onInput={() => dispatch(setActionData('releaseYear', releaseYearField.value))}
				ref={ref => { if (ref) { releaseYearField = ref; } }}
			/>)
		),
		buildRow(
			'releaseDateRow',
			buildCell('releaseDateLabel', 'Release date'),
			buildCell('releaseDateField', <input
				onInput={() => dispatch(setActionData('releaseDate', releaseDateField.value))}
				ref={ref => { if (ref) { releaseDateField = ref; } }}
			/>)
		),
		buildRow('save', buildCell('save', <button
			onClick={() => dispatch(setReleaseDate())}
			type='submit'
		>Save</button>, { colSpan: 2 })),
		buildRow('back', buildCell('back', <button
			onClick={() => dispatch(navigate(state.MENU))}
			type='submit'
		>Back</button>, { colSpan: 2 }))
	);
}

export default PendingReleaseDate;
