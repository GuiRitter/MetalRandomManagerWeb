// import React from 'react';
// import { useDispatch } from 'react-redux';

// import * as state from '../../constant/state';

// import { navigate } from '../../flux/action/index';
// import { getToken } from '../../flux/action/Spotify';

// import { buildCell, buildRow, buildTable } from '../../util/html';

// // TODO delete?
// function SignIn(props) {

// 	const dispatch = useDispatch();

// 	return buildTable(
// 		buildRow('title', buildCell('title', <h1>Spotify</h1>)),
// 		buildRow('sub title', buildCell('sub title', <h2>Sign in</h2>)),
// 		buildRow('get token', buildCell('get token', <button
// 			onClick={() => dispatch(getToken())}
// 			id='logInButton'
// 			type='submit'
// 		>Get token</button>)),
// 		buildRow('back', buildCell('back', <button
// 			onClick={() => dispatch(navigate(state.SPOTIFY_MENU))}
// 			type='submit'
// 		>Back</button>))
// 	);
// }

// export default SignIn;
