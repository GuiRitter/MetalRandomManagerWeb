import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from '../constant/state';

import { restoreFromLocalStorage } from '../flux/action/index';

import { getLog } from '../util/log';

import './App.css';

import Loading from './Loading';
import Menu from './Menu';
import Read from './crud/Read';
import PendingReleaseDate from './PendingReleaseDate';
import Search from './Search';
import SignIn from './SignIn';
import SpotifyIdMatcher from './Spotify/IdMatcher';
import SpotifyMenu from './Spotify/Menu';
import ToDo from './ToDo';
import PendingTrackNumber from './PendingTrackNumber';
import RawCRUD from './rawCRUD/Page';

const log = getLog('App.');

function componentDidMount(props, dispatch) {
	dispatch(restoreFromLocalStorage());
}

function App(props) {

	const didMountRef = useRef(false);

	const isAuthenticated = useSelector(state => !!(((state || {}).reducer || {}).token));
	const isLoading = useSelector(state => ((state || {}).reducer || {}).isLoading);
	const currentState = useSelector(state => ((state || {}).reducer || {}).state);
	const entity = useSelector(state => (((state || {}).reducer || {}).data || {}).entity) || null;
	
	const dispatch = useDispatch();

	log('App', { isAuthenticated, isLoading, state: currentState });

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch);
		}
	});

	if (isLoading) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		return <SignIn />;
	}

	switch (currentState || state.MENU) {
		case state.MENU: return <Menu />;
		case state.READ: return entity ? <Read /> : <Menu />;
		case state.RAW_CRUD: return <RawCRUD />;
		case state.RELEASE_DATE: return <PendingReleaseDate />;
		case state.SEARCH: return <Search />;
		case state.SPOTIFY_ID_MATCHER: return <SpotifyIdMatcher />;
		case state.SPOTIFY_MENU: return <SpotifyMenu />;
		case state.TO_DO: return <ToDo />;
		case state.TRACK_NUMBER: return <PendingTrackNumber />;
		default: return null;
	}
}

export default App;
