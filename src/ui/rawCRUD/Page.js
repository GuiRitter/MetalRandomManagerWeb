import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from '../../constant/state';

import { navigate, rawInsertAlbum, rawInsertArtist, rawInsertSong, rawSelect, setActionData } from '../../flux/action/index';

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
let insertSongRatingField = null;
let insertSongOutputField = null;

function componentDidMount(props, dispatch, selectWhereArtist, selectWhereAlbum, selectWhereSong, selectOutput, insertArtistName, insertArtistOutput, insertAlbumArtist, insertAlbumName, insertAlbumDate, insertAlbumSingle, insertAlbumOutput, insertSongAlbum, insertSongName, insertSongDate, insertSongSide, insertSongNumber, insertSongIndex, insertSongRating, insertSongOutput) {
	document.getElementById('root').classList.add('raw_crud');

	if (selectWhereArtistField && (selectWhereArtistField.value !== selectWhereArtist)) {
		selectWhereArtistField.value = selectWhereArtist;
	}
	if (selectWhereAlbumField && (selectWhereAlbumField.value !== selectWhereAlbum)) {
		selectWhereAlbumField.value = selectWhereAlbum;
	}
	if (selectWhereSongField && (selectWhereSongField.value !== selectWhereSong)) {
		selectWhereSongField.value = selectWhereSong;
	}
	if (selectOutputField && (selectOutputField.value !== selectOutput)) {
		selectOutputField.value = JSON.stringify(selectOutput, null, '\t');
	}
	if (insertArtistNameField && (insertArtistNameField.value !== insertArtistName)) {
		insertArtistNameField.value = insertArtistName;
	}
	if (insertArtistOutputField && (insertArtistOutputField.value !== insertArtistOutput)) {
		insertArtistOutputField.value = JSON.stringify(insertArtistOutput, null, '\t');
	}
	if (insertAlbumArtistField && (insertAlbumArtistField.value !== insertAlbumArtist)) {
		insertAlbumArtistField.value = insertAlbumArtist;
	}
	if (insertAlbumNameField && (insertAlbumNameField.value !== insertAlbumName)) {
		insertAlbumNameField.value = insertAlbumName;
	}
	if (insertAlbumDateField && (insertAlbumDateField.value !== insertAlbumDate)) {
		insertAlbumDateField.value = insertAlbumDate;
	}
	if (insertAlbumSingleField && (insertAlbumSingleField.value !== insertAlbumSingle)) {
		insertAlbumSingleField.value = insertAlbumSingle;
	}
	if (insertAlbumOutputField && (insertAlbumOutputField.value !== insertAlbumOutput)) {
		insertAlbumOutputField.value = JSON.stringify(insertAlbumOutput, null, '\t');;
	}
	if (insertSongAlbumField && (insertSongAlbumField.value !== insertSongAlbum)) {
		insertSongAlbumField.value = insertSongAlbum;
	}
	if (insertSongNameField && (insertSongNameField.value !== insertSongName)) {
		insertSongNameField.value = insertSongName;
	}
	if (insertSongDateField && (insertSongDateField.value !== insertSongDate)) {
		insertSongDateField.value = insertSongDate;
	}
	if (insertSongSideField && (insertSongSideField.value !== insertSongSide)) {
		insertSongSideField.value = insertSongSide;
	}
	if (insertSongNumberField && (insertSongNumberField.value !== insertSongNumber)) {
		insertSongNumberField.value = insertSongNumber;
	}
	if (insertSongIndexField && (insertSongIndexField.value !== insertSongIndex)) {
		insertSongIndexField.value = insertSongIndex;
	}
	if (insertSongRatingField && (insertSongRatingField.value !== insertSongRating)) {
		insertSongRatingField.value = insertSongRating;
	}
	if (insertSongOutputField && (insertSongOutputField.value !== insertSongOutput)) {
		insertSongOutputField.value = JSON.stringify(insertSongOutput, null, '\t');;
	}
}

function componentDidUpdate(props, prevProps, dispatch, selectWhereArtist, selectWhereAlbum, selectWhereSong, selectOutput, insertArtistName, insertArtistOutput, insertAlbumArtist, insertAlbumName, insertAlbumDate, insertAlbumSingle, insertAlbumOutput, insertSongAlbum, insertSongName, insertSongDate, insertSongSide, insertSongNumber, insertSongIndex, insertSongRating, insertSongOutput) {
	componentDidMount(props, dispatch, selectWhereArtist, selectWhereAlbum, selectWhereSong, selectOutput, insertArtistName, insertArtistOutput, insertAlbumArtist, insertAlbumName, insertAlbumDate, insertAlbumSingle, insertAlbumOutput, insertSongAlbum, insertSongName, insertSongDate, insertSongSide, insertSongNumber, insertSongIndex, insertSongRating, insertSongOutput);
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

	const selectData = useSelector(state => ((((state || {}).reducer || {}).data) || {}).select) || {};
	const insertArtistData = useSelector(state => ((((state || {}).reducer || {}).data) || {}).insertArtist) || {};
	const insertAlbumData = useSelector(state => ((((state || {}).reducer || {}).data) || {}).insertAlbum) || {};
	const insertSongData = useSelector(state => ((((state || {}).reducer || {}).data) || {}).insertSong) || {};

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(
				props, prevProps, dispatch, selectData.artist || '', selectData.album || '', selectData.song || '', selectData.output || '', insertArtistData.name || '', insertArtistData.output || '', insertAlbumData.artist || '', insertAlbumData.name || '', insertAlbumData.date || '', insertAlbumData.single || false, insertAlbumData.output || '', insertSongData.album || '', insertSongData.name || '', insertSongData.date || '', insertSongData.side || '', insertSongData.number || '', insertSongData.index || '', insertSongData.rating || '', insertSongData.output || ''
			);
		} else {
			didMountRef.current = true;
			componentDidMount(
				props, dispatch, selectData.artist || '', selectData.album || '', selectData.song || '', selectData.output || '', insertArtistData.name || '', insertArtistData.output || '', insertAlbumData.artist || '', insertAlbumData.name || '', insertAlbumData.date || '', insertAlbumData.single || false, insertAlbumData.output || '', insertSongData.album || '', insertSongData.name || '', insertSongData.date || '', insertSongData.side || '', insertSongData.number || '', insertSongData.index || '', insertSongData.rating || '', insertSongData.output || ''
			);
		}
	});

	log('RawCRUD');

	return <><input
		className='select_where_artist'
		onInput={() => dispatch(setActionData('select', Object.assign({}, selectData, {
			...selectData,
			artist: selectWhereArtistField.value
		})))}
		placeholder='where artist'
		ref={ref => { if (ref) { selectWhereArtistField = ref; } }}
	/><input
		className='select_where_album'
		onInput={() => dispatch(setActionData('select', Object.assign({}, selectData, {
			...selectData,
			album: selectWhereAlbumField.value
		})))}
		placeholder='where album'
		ref={ref => { if (ref) { selectWhereAlbumField = ref; } }}
	/><input
		className='select_where_song'
		onInput={() => dispatch(setActionData('select', Object.assign({}, selectData, {
			...selectData,
			song: selectWhereSongField.value
		})))}
		placeholder='where song'
		ref={ref => { if (ref) { selectWhereSongField = ref; } }}
	/><button
		className='select_button'
		onClick={() => dispatch(rawSelect())}
		type='submit'
	>Select</button><textarea
		className='select_output'
		placeholder='select output'
		ref={ref => { if (ref) { selectOutputField = ref; } }}
	/><button
		className='back'
		onClick={() => dispatch(navigate(state.MENU))}
		type='submit'
	>Back</button><input
		className='insert_artist_name'
		onInput={() => dispatch(setActionData('insertArtist', Object.assign({}, insertArtistData, {
			...insertArtistData,
			name: insertArtistNameField.value
		})))}
		placeholder='insert artist name'
		ref={ref => { if (ref) { insertArtistNameField = ref; } }}
	/><button
		className='insert_artist_button'
		onClick={() => dispatch(rawInsertArtist())}
		type='submit'
	>Insert Artist</button><textarea
		className='insert_artist_output'
		placeholder='insert artist output'
		ref={ref => { if (ref) { insertArtistOutputField = ref; } }}
	/><input
		className='insert_album_artist'
		onInput={() => dispatch(setActionData('insertAlbum', Object.assign({}, insertAlbumData, {
			...insertAlbumData,
			artist: insertAlbumArtistField.value
		})))}
		placeholder='insert album artist'
		ref={ref => { if (ref) { insertAlbumArtistField = ref; } }}
	/><input
		className='insert_album_name'
		onInput={() => dispatch(setActionData('insertAlbum', Object.assign({}, insertAlbumData, {
			...insertAlbumData,
			name: insertAlbumNameField.value
		})))}
		placeholder='insert album name'
		ref={ref => { if (ref) { insertAlbumNameField = ref; } }}
	/><input
		className='insert_album_date'
		onInput={() => dispatch(setActionData('insertAlbum', Object.assign({}, insertAlbumData, {
			...insertAlbumData,
			date: insertAlbumDateField.value
		})))}
		placeholder='insert album date'
		ref={ref => { if (ref) { insertAlbumDateField = ref; } }}
	/><input
		className='insert_album_single'
		onInput={() => dispatch(setActionData('insertAlbum', Object.assign({}, insertAlbumData, {
			...insertAlbumData,
			single: insertAlbumSingleField.value
		})))}
		placeholder='insert album single'
		ref={ref => { if (ref) { insertAlbumSingleField = ref; } }}
		type='checkbox'
	/><button
		className='insert_album_button'
		onClick={() => dispatch(rawInsertAlbum())}
		type='submit'
	>Insert Album</button><textarea
		className='insert_album_output'
		placeholder='insert album output'
		ref={ref => { if (ref) { insertAlbumOutputField = ref; } }}
	/><input
		className='insert_song_album'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			album: insertSongAlbumField.value
		})))}
		placeholder='insert song album'
		ref={ref => { if (ref) { insertSongAlbumField = ref; } }}
	/><input
		className='insert_song_name'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			name: insertSongNameField.value
		})))}
		placeholder='insert song name'
		ref={ref => { if (ref) { insertSongNameField = ref; } }}
	/><input
		className='insert_song_date'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			date: insertSongDateField.value
		})))}
		placeholder='insert song date'
		ref={ref => { if (ref) { insertSongDateField = ref; } }}
	/><input
		className='insert_song_side'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			side: insertSongSideField.value
		})))}
		placeholder='insert song side'
		ref={ref => { if (ref) { insertSongSideField = ref; } }}
	/><input
		className='insert_song_number'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			number: insertSongNumberField.value
		})))}
		placeholder='insert song number'
		ref={ref => { if (ref) { insertSongNumberField = ref; } }}
	/><input
		className='insert_song_index'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			index: insertSongIndexField.value
		})))}
		placeholder='insert song index'
		ref={ref => { if (ref) { insertSongIndexField = ref; } }}
	/><input
		className='insert_song_rating'
		onInput={() => dispatch(setActionData('insertSong', Object.assign({}, insertSongData, {
			...insertSongData,
			rating: insertSongRatingField.value
		})))}
		placeholder='insert song rating'
		ref={ref => { if (ref) { insertSongRatingField = ref; } }}
	/><button
		className='insert_song_button'
		onClick={() => dispatch(rawInsertSong())}
		type='submit'
	>Insert Song</button><textarea
		className='insert_song_output'
		placeholder='insert song output'
		ref={ref => { if (ref) { insertSongOutputField = ref; } }}
	/></>;
}

export default RawCRUD;
