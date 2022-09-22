import { render, screen } from '@testing-library/react';
import { getPageAmount } from '../../../util/data';

test('no items: single page', () => {
	expect(getPageAmount(0, 30)).toStrictEqual(1);
});

test('1 item: single page', () => {
	expect(getPageAmount(1, 30)).toStrictEqual(1);
});

test('almost a full page: single page', () => {
	expect(getPageAmount(29, 30)).toStrictEqual(1);
});

test('full page: single page', () => {
	expect(getPageAmount(30, 30)).toStrictEqual(1);
});

test('1 item more than a full page: 2 pages', () => {
	expect(getPageAmount(31, 30)).toStrictEqual(2);
});

test('almost 2 full pages: 2 pages', () => {
	expect(getPageAmount(59, 30)).toStrictEqual(2);
});

test('2 full pages: 2 pages', () => {
	expect(getPageAmount(60, 30)).toStrictEqual(2);
});

test('1 item more than 2 full pages: 3 pages', () => {
	expect(getPageAmount(61, 30)).toStrictEqual(3);
});
