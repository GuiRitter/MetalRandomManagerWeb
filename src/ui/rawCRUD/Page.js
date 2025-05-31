import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from '../../constant/state';
import { PAGE_SIZE } from '../../constant/system';

import { navigate, rawSelect } from '../../flux/action/index';
import { getCurrentPage, getFirstPage, getLastPage, getNextPage, getPreviousPage, setPageNumber } from '../../flux/action/data';

import { getPageAmount } from '../../util/data';
import { buildCell, buildRow, buildTable } from '../../util/html';
import { buildArray } from '../../util/system';

import { getLog } from '../../util/log';

import './RawCRUD.css';

const log = getLog('RawCRUD.');

let selectWhereArtistField = null;
let selectWhereAlbumField = null;
let selectWhereSongField = null;
let selectOutputField = null;

let insertArtistNameField = null;
let insertArtistOutputField = null;

let insertAlbumArtistField = null;
let insertAlbumNameField = null;
let insertAlbumDateField = null;
let insertAlbumSingleField = null;
let insertAlbumOutputField = null;

let insertSongAlbumField = null;
let insertSongNameField = null;
let insertSongDateField = null;
let insertSongSideField = null;
let insertSongNumberField = null;
let insertSongIndexField = null;
let insertSongOutputField = null;

function componentDidMount(props, dispatch) {
}

function componentDidUpdate(props, prevProps, dispatch) {
	componentDidMount(props, dispatch);
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function RawCRUD(props) {

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	const dispatch = useDispatch();

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(
				props, prevProps, dispatch
			);
		} else {
			didMountRef.current = true;
			componentDidMount(
				props, dispatch
			);
		}
	});

	log('RawCRUD');

	return <><input
		className='select_where_artist'
		// onInput={() => alert('TO DO selectWhereArtistField')}
		placeholder='where artist'
		ref={ref => { if (ref) { selectWhereArtistField = ref; } }}
	/><input
		className='select_where_album'
		// onInput={() => alert('TO DO selectWhereAlbumField')}
		placeholder='where album'
		ref={ref => { if (ref) { selectWhereAlbumField = ref; } }}
	/><input
		className='select_where_song'
		// onInput={() => alert('TO DO selectWhereSongField')}
		placeholder='where song'
		ref={ref => { if (ref) { selectWhereSongField = ref; } }}
	/><button
		className='select_button'
		onClick={() => dispatch(rawSelect(selectWhereArtistField.value, selectWhereAlbumField.value, selectWhereSongField.value))}
		type='submit'
	>Select</button><input
		className='select_output'
		// onInput={() => alert('TO DO selectOutputField')}
		placeholder='select output'
		ref={ref => { if (ref) { selectOutputField = ref; } }}
	/><button
		className='back'
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Back</button><input
		className='insert_artist_name'
		// onInput={() => alert('TO DO insertArtistNameField')}
		placeholder='insert artist name'
		ref={ref => { if (ref) { insertArtistNameField = ref; } }}
	/><button
		className='insert_artist_button'
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Insert Artist</button><input
		className='insert_artist_output'
		// onInput={() => alert('TO DO insertArtistOutputField')}
		placeholder='insert artist output'
		ref={ref => { if (ref) { insertArtistOutputField = ref; } }}
	/><input
		className='insert_album_artist'
		// onInput={() => alert('TO DO insertAlbumArtistField')}
		placeholder='insert album artist'
		ref={ref => { if (ref) { insertAlbumArtistField = ref; } }}
	/><input
		className='insert_album_name'
		// onInput={() => alert('TO DO insertAlbumNameField')}
		placeholder='insert album name'
		ref={ref => { if (ref) { insertAlbumNameField = ref; } }}
	/><input
		className='insert_album_date'
		// onInput={() => alert('TO DO insertAlbumDateField')}
		placeholder='insert album date'
		ref={ref => { if (ref) { insertAlbumDateField = ref; } }}
	/><input
		className='insert_album_single'
		// onInput={() => alert('TO DO insertAlbumSingleField')}
		placeholder='insert album single'
		ref={ref => { if (ref) { insertAlbumSingleField = ref; } }}
	/><button
		className='insert_album_button'
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Insert Album</button><input
		className='insert_album_output'
		// onInput={() => alert('TO DO insertAlbumOutputField')}
		placeholder='insert album output'
		ref={ref => { if (ref) { insertAlbumOutputField = ref; } }}
	/><input
		className='insert_song_album'
		// onInput={() => alert('TO DO insertSongAlbumField')}
		placeholder='insert song album'
		ref={ref => { if (ref) { insertSongAlbumField = ref; } }}
	/><input
		className='insert_song_name'
		// onInput={() => alert('TO DO insertSongNameField')}
		placeholder='insert song name'
		ref={ref => { if (ref) { insertSongNameField = ref; } }}
	/><input
		className='insert_song_date'
		// onInput={() => alert('TO DO insertSongDateField')}
		placeholder='insert song date'
		ref={ref => { if (ref) { insertSongDateField = ref; } }}
	/><input
		className='insert_song_side'
		// onInput={() => alert('TO DO insertSongSideField')}
		placeholder='insert song side'
		ref={ref => { if (ref) { insertSongSideField = ref; } }}
	/><input
		className='insert_song_number'
		// onInput={() => alert('TO DO insertSongNumberField')}
		placeholder='insert song number'
		ref={ref => { if (ref) { insertSongNumberField = ref; } }}
	/><input
		className='insert_song_index'
		// onInput={() => alert('TO DO insertSongIndexField')}
		placeholder='insert song index'
		ref={ref => { if (ref) { insertSongIndexField = ref; } }}
	/><button
		className='insert_song_button'
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Insert Song</button><input
		className='insert_song_output'
		// onInput={() => alert('TO DO insertSongOutputField')}
		placeholder='insert song output'
		ref={ref => { if (ref) { insertSongOutputField = ref; } }}
	/></>;
}

export default RawCRUD;
