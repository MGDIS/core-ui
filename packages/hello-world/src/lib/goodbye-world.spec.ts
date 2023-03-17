import { expect, it } from '@jest/globals';
import { goodbyeWorld } from './goodbye-world';

it('should say goodbye', () => {
	expect(goodbyeWorld('spa')).toBe('goodbye spa');
});
