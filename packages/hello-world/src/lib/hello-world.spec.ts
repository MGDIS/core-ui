import { expect, it } from '@jest/globals';
import { helloWorld } from './hello-world';

it('should say hello', () => {
	expect(helloWorld('spa')).toBe('hello spa');
});
