import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { navigate, showArtist, signOut } from '../flux/action/index';
import * as state from '../constant/state';

import { buildCell, buildRow, buildTable } from '../util/html';

function componentDidMount(props) {
	document.getElementById('root').classList = [];
}

function Menu(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});
	
	return buildTable(
		buildRow('title', buildCell('title', <h1>Metal Random Manager</h1>)),
		buildRow('artist', buildCell('artist', <button
			onClick={() => dispatch(showArtist())}
			type='submit'
		>Artists</button>)),
		buildRow('release_date', buildCell('release_date', <button
			onClick={() => dispatch(navigate(state.RELEASE_DATE))}
			type='submit'
		>Release dates</button>)),
		buildRow('track_number', buildCell('track_number', <button
			onClick={() => dispatch(navigate(state.TRACK_NUMBER))}
			type='submit'
		>Track numbers</button>)),
		buildRow('search', buildCell('search', <button
			onClick={() => dispatch(navigate(state.SEARCH))}
			type='submit'
		>Search</button>)),
		buildRow('to do', buildCell('to do', <button
			onClick={() => dispatch(navigate(state.TO_DO))}
			type='submit'
		>To do</button>)),
		buildRow('Spotify', buildCell('Spotify', <button
			onClick={() => dispatch(navigate(state.SPOTIFY_MENU))}
			type='submit'
		>Spotify</button>)),
		buildRow('raw_crud', buildCell('raw_crud', <button
			onClick={() => dispatch(navigate(state.RAW_CRUD))}
			type='submit'
		>Raw CRUD</button>)),
		buildRow('sign out', buildCell('button', <button
			onClick={() => dispatch(signOut())}
			type='submit'
		>Sign out</button>))
	);
}

export default Menu;
