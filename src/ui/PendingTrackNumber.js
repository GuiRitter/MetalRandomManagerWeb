import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPendingTrackNumber, navigate, setActionData, setTrackNumber } from '../flux/action/index';
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

	const artistSearchString = encodeURIComponent(header.artist.name || '');
	const albumSearchString = encodeURIComponent(header.album.name || '');
	const bothSearchString = encodeURIComponent(`${header.artist.name || ''} ${header.album.name || ''}`);
	
	const artistGoogleSearchString = encodeURIComponent(`"${header.artist.name || ''}"`);
	const albumGoogleSearchString = encodeURIComponent(`"${header.album.name || ''}"`);
	const bothGoogleSearchString = encodeURIComponent(`"${header.artist.name || ''}" "${header.album.name || ''}"`);

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
			buildCell('artistNameField', <input value={header.artist.name || ''} readOnly />)
		),
		buildRow(
			'albumIdRow',
			buildCell('albumIdLabel', 'Album Id'),
			buildCell('albumIdField', header.album.id || '')
		),
		buildRow(
			'albumNameRow',
			buildCell('albumNameLabel', 'Album name'),
			buildCell('albumNameField', <input value={header.album.name || ''} readOnly />)
		),
		buildRow(
			'albumDateRow',
			buildCell('albumDateLabel', 'Album release date'),
			buildCell('albumDateField', header.album.releaseDate || '')
		)
	)}<br/>{buildTable(
		buildRow('searchHeader',
			buildCell('name', 'Search'),
			buildCell('artist', 'Artist'),
			buildCell('album', 'Album'),
			buildCell('both', 'Both'),
		),
		buildRow('metalArchives',
			buildCell('name', 'Metal Archives'),
			buildCell('artist', <a
				href={`https://www.metal-archives.com/search?searchString=${artistSearchString}&type=band_name`}
			>Search</a>),
			buildCell('album', <a
				href={`https://www.metal-archives.com/search?searchString=${albumSearchString}&type=album_title`}
			>Search</a>),
			buildCell('both', <a
				href={`https://www.metal-archives.com/search/advanced/searching/albums?bandName=${artistSearchString}&releaseTitle=${albumSearchString}&genre=#albums`}
			>Search</a>),
		),
		buildRow('wikipedia',
			buildCell('name', 'Wikipedia'),
			buildCell('artist', <a
				href={`https://en.wikipedia.org/w/index.php?search=${artistSearchString}`}
			>Search</a>),
			buildCell('album', <a
				href={`https://en.wikipedia.org/w/index.php?search=${albumSearchString}`}
			>Search</a>),
			buildCell('both', <a
				href={`https://en.wikipedia.org/w/index.php?search=${bothSearchString}`}
			>Search</a>),
		),
		buildRow('google',
			buildCell('name', 'Google EN'),
			buildCell('artist', <a
				href={`https://www.google.com/search?q=${artistGoogleSearchString}&lr=lang_en&hl=en&tbs=lr%3Alang_1en&oq=${artistGoogleSearchString}`}
			>Search</a>),
			buildCell('album', <a
				href={`https://www.google.com/search?q=${albumGoogleSearchString}&lr=lang_en&hl=en&tbs=lr%3Alang_1en&oq=${albumGoogleSearchString}`}
			>Search</a>),
			buildCell('both', <a
				href={`https://www.google.com/search?q=${bothGoogleSearchString}&lr=lang_en&hl=en&tbs=lr%3Alang_1en&oq=${bothGoogleSearchString}`}
			>Search</a>),
		),
	)}<br/>{buildTable(
		buildRow('songHeaderRow', 
			buildCell('songIdHeader', 'Song Id'),
			buildCell('songNameHeader', 'Song'),
			buildCell('songTrackSideHeader', 'Side', { className: 'vertical-header' }),
			buildCell('songTrackNumberHeader', 'Number', { className: 'vertical-header' }),
			buildCell('songTrackIndexHeader', 'Index', { className: 'vertical-header' }),
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
							trackNumber: event.target.value,
							trackIndex: event.target.value
						})
				)))}
				value={song.trackNumber || ''}
			/>),
			buildCell('songTrackIndex', <input
				className='song-track-index-input'
				onInput={(event) => dispatch(setActionData('songList', songList.map(song2 =>
					((song.id || '') !== (song2.id || ''))
						? song2
						: ({
							...song2,
							trackIndex: event.target.value
						})
				)))}
				value={song.trackIndex || ''}
			/>),
		)),
		buildRow('save', buildCell('save', <button
			onClick={() => dispatch(setTrackNumber())}
			type='submit'
		>Save</button>, { colSpan: 4 })),
		buildRow('back', buildCell('back', <button
			onClick={() => dispatch(navigate(state.MENU))}
			type='submit'
		>Back</button>, { colSpan: 4 }))
	)}</>;
}

export default PendingReleaseDate;
