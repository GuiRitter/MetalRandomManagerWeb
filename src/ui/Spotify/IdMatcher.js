import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from '../../constant/state';

import { navigate } from '../../flux/action/index';
import { getPendingId, setSpotifyId } from '../../flux/action/Spotify';

import { buildCell, buildRow, buildTable } from '../../util/html';

function componentDidMount(props) {
}

function componentDidUpdate(props, prevProps) {
	componentDidMount(props);
}

function IdMatcher(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	const pendingSpotifyIdRow = useSelector(state => (((state || {}).reducer || {}).data || {}).spotifyIdRow) || {};
	const pendingSongRowList = useSelector(state => (((state || {}).reducer || {}).data || {}).songList) || [];

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, null);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});

	const rowList = pendingSongRowList.map(pendingSong => buildRow(
		pendingSong.songId,
		buildCell('match string', pendingSong.matchString, { className: 'table-cell' }),
		buildCell('album', pendingSong.album, { className: 'table-cell' }),
		buildCell('track', pendingSong.track, { className: 'table-cell' }),
		buildCell('button', <input onClick={() => dispatch(setSpotifyId(pendingSong.songId, pendingSong.matchString))} type='button' value='Match' />),
	));

	const colSpan = 4;

	return buildTable(
		buildRow('title', buildCell('title', <h1>Spotify</h1>, { colSpan })),
		buildRow('subtitle', buildCell('title', <h2>Id Matcher</h2>, { colSpan })),
		buildRow('refresh', buildCell('refresh', <button
			onClick={() => dispatch(getPendingId())}
			type='submit'
		>Refresh</button>, { colSpan })),
		buildRow(
			'pending Spotify Id',
			buildCell('match string', pendingSpotifyIdRow.matchString, { className: 'table-cell' }),
			buildCell('album', pendingSpotifyIdRow.album, { className: 'table-cell' }),
			buildCell('track', pendingSpotifyIdRow.track, { className: 'table-cell' }),
		),
		buildRow(
			'header',
			buildCell('match string', 'Artist · Song', { className: 'bold table-cell' }),
			buildCell('album', 'Album', { className: 'bold table-cell' }),
			buildCell('track', 'Track', { className: 'bold table-cell' }),
		),
		...rowList,
		buildRow('back', buildCell('back', <button
			onClick={() => dispatch(navigate(state.SPOTIFY_MENU))}
			type='submit'
		>Back</button>, { colSpan }))
	);
}

export default IdMatcher;
