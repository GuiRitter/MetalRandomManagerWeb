import React from 'react';
import { useDispatch/*, useSelector*/ } from 'react-redux';

import { abortRequest } from '../flux/action/axios';

import { buildCell, buildRow, buildTable } from '../util/html';

function Loading(props) {

	const dispatch = useDispatch();

	// const abortSignal = useSelector(state => ((state || {}).reducer || {}).abortSignal);

	// let rowList = [buildRow('header', buildCell('header', <h1>Loading</h1>))];

	// if (abortSignal) {
	// 	rowList = rowList.concat(buildRow('button', buildCell('button', <button
	// 		onClick={() => dispatch(abortRequest())}
	// 		type='submit'
	// 	>Cancel</button>)));
	// }

	// return buildTable(rowList);
	return buildTable(
		buildRow('header', buildCell('header', <h1>Loading</h1>)),
		buildRow('button', buildCell('button', <button
			onClick={() => dispatch(abortRequest())}
			type='submit'
		>Cancel</button>))
	);
}

export default Loading;
