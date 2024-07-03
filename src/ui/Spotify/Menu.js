import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { navigate } from '../../flux/action/index';
import * as state from '../../constant/state';

import { buildCell, buildRow, buildTable } from '../../util/html';

function componentDidMount(props) {
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
		buildRow('title', buildCell('title', <h1>Spotify</h1>)),
		buildRow('login', buildCell('login', <a
			href='api/Spotify/login'
		>Login</a>)),
		buildRow('read playlist list', buildCell('read playlist list', <button
			// onClick={() => dispatch(navigate(state.SPOTIFY_READ_PLAYLIST_LIST))}
			type='submit'
		>Read playlists</button>)),
		buildRow('read playlist', buildCell('read playlist', <button
			// onClick={() => dispatch(navigate(state.SPOTIFY_READ_PLAYLIST_SONG))}
			type='submit'
		>Read songs</button>)),
		buildRow('back', buildCell('back', <button
			onClick={() => dispatch(navigate(state.MENU))}
			type='submit'
		>Back</button>))
	);
}

export default Menu;
