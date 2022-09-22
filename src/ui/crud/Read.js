import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from '../../constant/state';
import { PAGE_SIZE } from '../../constant/system';

import { navigate } from '../../flux/action/index';
import { getPage, setPageNumber } from '../../flux/action/data';

import { getPageAmount } from '../../util/data';
import { buildCell, buildRow, buildTable } from '../../util/html';
import { buildArray } from '../../util/system';

import { getLog } from '../../util/log';

const log = getLog('crud.Read.');

function componentDidMount(props, dispatch, pageField, page) {
	if (pageField && (pageField.value !== page)) {
		pageField.value = page + 1;
	}
}

function componentDidUpdate(props, prevProps, dispatch, pageField, page) {
	componentDidMount(props, dispatch, pageField, page);
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function Read(props) {

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	const dispatch = useDispatch();

	const [pageField, setPageField] = useState(null);

	const list = useSelector(state => (((state || {}).reducer || {}).data || {}).list) || [];
	const pageNumber = useSelector(state => (((state || {}).reducer || {}).data || {}).pageNumber) || 0;
	// const pageSize = useSelector(state => (((state || {}).reducer || {}).data || {}).pageSize) || PAGE_SIZE;
	const count = useSelector(state => (((state || {}).reducer || {}).data || {}).count) || 0;
	const pageAmount = getPageAmount(count, PAGE_SIZE);

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(
				props, prevProps, dispatch, pageField, pageNumber
			);
		} else {
			didMountRef.current = true;
			componentDidMount(
				props, dispatch, pageField, pageNumber
			);
		}
	});

	log('Read', { count, list });

	return <>{buildTable(
		[
			buildRow('title', buildCell('title', <h1>Artists</h1>, { colSpan: 3 })), // TODO
			buildRow(
				'header',
				buildCell('name', 'Name'),
				buildCell('update_button', ''),
				buildCell('delete_button', '')
			)
		].concat(list.map((entity, index) => buildRow(
			`entity_${index}`,
			buildCell(`name_${index}`, entity.name),
			buildCell(`update_button_${index}`, <button
				onClick={() => alert('TO DO')}
				type='submit'
			>Update</button>),
			buildCell(`delete_button_${index}`, <button
				onClick={() => alert('TO DO')}
				type='submit'
			>Delete</button>)
		)))
	)}{buildTable(
		buildRow(
			'pagination',
			buildCell('create', <button
				onClick={() => alert('TO DO')}
				type='submit'
			>Create</button>),
			buildCell('first', <button
				onClick={() => alert('TO DO')}
				type='submit'
			>{'|<'}</button>),
			buildCell('previous', <button
				onClick={() => alert('TO DO')}
				type='submit'
			>{'<'}</button>),
			buildCell('page', <select
				onInput={() => dispatch(setPageNumber(pageField.value))}
				ref={ref => { if (ref) { setPageField(ref); } }}
			>{
					buildArray(pageAmount).map(i => <option>{i + 1}</option>)
				}</select>),
			buildCell('next', <button
				onClick={() => alert('TO DO')}
				type='submit'
			>{'>'}</button>),
			buildCell('last', <button
				onClick={() => alert('TO DO')}
				type='submit'
			>{'>|'}</button>),
			buildCell('refresh', <button
				onClick={() => dispatch(getPage(pageNumber))}
				type='submit'
			>Refresh</button>)
		),
		buildRow('back', buildCell('back', <button
			onClick={() => dispatch(navigate(state.MENU))}
			type='submit'
		>Back</button>, { colSpan: 7 }))
	)}</>;
}

export default Read;
