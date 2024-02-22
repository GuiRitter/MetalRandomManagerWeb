import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPendingTrackNumber, navigate, setActionData, setTrackNumberDate } from '../flux/action/index';
import * as state from '../constant/state';

import { buildCell, buildRow, buildTable } from '../util/html';

function PendingReleaseDate(props) {

	const dispatch = useDispatch();

	const data = useSelector(state => ((state || {}).reducer || {}).data || {}) || {};

	const header = {
		count: data.count || '',
		artist: data.artist || {},
		album: data.album || {}
	};

	const songList = data.songList || [];

	return <>{buildTable(
		buildRow('refresh', buildCell('refresh', <button
			onClick={() => dispatch(getPendingTrackNumber())}
			type='submit'
		>Refresh</button>, { colSpan: 2 })),
		buildRow(
			'remainingRow',
			buildCell('remainingLabel', 'Remaining'),
			buildCell('remainingField', header.count || '')
		),
		buildRow(
			'artistIdRow',
			buildCell('artistIdLabel', 'Artist Id'),
			buildCell('artistIdField', header.artist.id || '')
		),
		buildRow(
			'artistNameRow',
			buildCell('artistNameLabel', 'Artist Name'),
			buildCell('artistNameField', header.artist.name || '')
		),
		buildRow(
			'albumIdRow',
			buildCell('albumIdLabel', 'Album Id'),
			buildCell('albumIdField', header.album.id || '')
		),
		buildRow(
			'albumNameRow',
			buildCell('albumNameLabel', 'Album name'),
			buildCell('albumNameField', header.album.name || '')
		),
		buildRow(
			'albumDateRow',
			buildCell('albumDateLabel', 'Album release date'),
			buildCell('albumDateField', header.album.releaseDate || '')
		)
	)}{buildTable(
		buildRow('songHeaderRow', 
			buildCell('songIdHeader', 'Song Id'),
			buildCell('songNameHeader', 'Song'),
			buildCell('songTrackSideHeader', 'Side'),
			buildCell('songTrackNumberHeader', 'Number'),
		),
		songList.map((song, index) => buildRow(`song_${index}_row`,
			buildCell('songId', song.id || ''),
			buildCell('songName', song.name || ''),
			// TODO move songList update code to the reducer
			buildCell('songTrackSide', <input
				className='song-track-side-input'
				onInput={(event) => dispatch(setActionData('songList', songList.map(song2 =>
					((song.id || '') !== (song2.id || ''))
						? song2
						: ({
							...song2,
							trackSide: event.target.value
						})
				)))}
				value={song.trackSide || ''}
			/>),
			buildCell('songTrackNumber', <input
				className='song-track-number-input'
				onInput={(event) => dispatch(setActionData('songList', songList.map(song2 =>
					((song.id || '') !== (song2.id || ''))
						? song2
						: ({
							...song2,
							trackNumber: event.target.value
						})
				)))}
				value={song.trackNumber || ''}
			/>),
		)),
		buildRow('save', buildCell('save', <button
			onClick={() => dispatch(setTrackNumberDate())}
			type='submit'
		>Save</button>, { colSpan: 4 })),
		buildRow('back', buildCell('back', <button
			onClick={() => dispatch(navigate(state.MENU))}
			type='submit'
		>Back</button>, { colSpan: 4 }))
	)}</>;
}

export default PendingReleaseDate;
