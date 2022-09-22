import { render, screen } from '@testing-library/react';
import { buildArray } from '../../../util/system';

test('test', () => {
	expect(buildArray(3)).toStrictEqual([0, 1, 2]);
});
