import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from '../../constant/state';
import { PAGE_SIZE } from '../../constant/system';

import { navigate } from '../../flux/action/index';
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

function componentDidMount(props, dispatch, pageField, page, firstField, previousField, nextField, lastField, pageAmount) {
	if (pageField && (pageField.value !== (page + 1))) {
		pageField.value = page + 1;
	}
	if (page === 0) {
		if (previousField) {
			previousField.disabled = 'disabled';
		}
		if (firstField) {
			firstField.disabled = 'disabled';
		}
	}
	if (page === (pageAmount - 1)) {
		if (nextField) {
			nextField.disabled = 'disabled';
		}
		if (lastField) {
			lastField.disabled = 'disabled';
		}
	}
}

function componentDidUpdate(props, prevProps, dispatch, pageField, page, firstField, previousField, nextField, lastField, pageAmount) {
	componentDidMount(props, dispatch, pageField, page, firstField, previousField, nextField, lastField, pageAmount);
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

	const [pageField, setPageField] = useState(null);
	const [firstField, setFirstField] = useState(null);
	const [previousField, setPreviousField] = useState(null);
	const [nextField, setNextField] = useState(null);
	const [lastField, setLastField] = useState(null);

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(
				props, prevProps, dispatch, pageField, pageNumber, firstField, previousField, nextField, lastField, pageAmount
			);
		} else {
			didMountRef.current = true;
			componentDidMount(
				props, dispatch, pageField, pageNumber, firstField, previousField, nextField, lastField, pageAmount
			);
		}
	});

	log('RawCRUD', { count, list });

	return <><input
		className='select_where_artist'
		onInput={() => alert('TO DO selectWhereArtistField')}
		ref={ref => { if (ref) { selectWhereArtistField = ref; } }}
	/><input
		className='select_where_album'
		onInput={() => alert('TO DO selectWhereAlbumField')}
		ref={ref => { if (ref) { selectWhereAlbumField = ref; } }}
	/><input
		className='select_where_song'
		onInput={() => alert('TO DO selectWhereSongField')}
		ref={ref => { if (ref) { selectWhereSongField = ref; } }}
	/><input
		className='select_output'
		onInput={() => alert('TO DO selectOutputField')}
		ref={ref => { if (ref) { selectOutputField = ref; } }}
	/><input
		className='insert_artist_name'
		onInput={() => alert('TO DO insertArtistNameField')}
		ref={ref => { if (ref) { insertArtistNameField = ref; } }}
	/><input
		className='insert_artist_output'
		onInput={() => alert('TO DO insertArtistOutputField')}
		ref={ref => { if (ref) { insertArtistOutputField = ref; } }}
	/><input
		className='insert_album_artist'
		onInput={() => alert('TO DO insertAlbumArtistField')}
		ref={ref => { if (ref) { insertAlbumArtistField = ref; } }}
	/><input
		className='insert_album_name'
		onInput={() => alert('TO DO insertAlbumNameField')}
		ref={ref => { if (ref) { insertAlbumNameField = ref; } }}
	/><input
		className='insert_album_date'
		onInput={() => alert('TO DO insertAlbumDateField')}
		ref={ref => { if (ref) { insertAlbumDateField = ref; } }}
	/><input
		className='insert_album_single'
		onInput={() => alert('TO DO insertAlbumSingleField')}
		ref={ref => { if (ref) { insertAlbumSingleField = ref; } }}
	/><input
		className='insert_album_output'
		onInput={() => alert('TO DO insertAlbumOutputField')}
		ref={ref => { if (ref) { insertAlbumOutputField = ref; } }}
	/><input
		className='insert_song_album'
		onInput={() => alert('TO DO insertSongAlbumField')}
		ref={ref => { if (ref) { insertSongAlbumField = ref; } }}
	/><input
		className='insert_song_name'
		onInput={() => alert('TO DO insertSongNameField')}
		ref={ref => { if (ref) { insertSongNameField = ref; } }}
	/><input
		className='insert_song_date'
		onInput={() => alert('TO DO insertSongDateField')}
		ref={ref => { if (ref) { insertSongDateField = ref; } }}
	/><input
		className='insert_song_side'
		onInput={() => alert('TO DO insertSongSideField')}
		ref={ref => { if (ref) { insertSongSideField = ref; } }}
	/><input
		className='insert_song_number'
		onInput={() => alert('TO DO insertSongNumberField')}
		ref={ref => { if (ref) { insertSongNumberField = ref; } }}
	/><input
		className='insert_song_index'
		onInput={() => alert('TO DO insertSongIndexField')}
		ref={ref => { if (ref) { insertSongIndexField = ref; } }}
	/><input
		className='insert_song_output'
		onInput={() => alert('TO DO insertSongOutputField')}
		ref={ref => { if (ref) { insertSongOutputField = ref; } }}
	/></>;
}

export default RawCRUD;
