import { buildConstantEntity as newStep } from '../util/system';

export const TO_WATCH = newStep(-2, 'To Watch');

export const TO_DOWNLOAD = newStep(-1, 'To Download');

export const TO_LISTEN = newStep(0, 'To Listen');

export const TO_COVER = newStep(1, 'To Cover');

export const TO_TAG = newStep(2, 'To Tag');

export const TO_RENAME = newStep(3, 'To Rename');

export const DONE = newStep(4, 'Done');

export const NOT_SELECTED = newStep(99, 'Not Selected');
