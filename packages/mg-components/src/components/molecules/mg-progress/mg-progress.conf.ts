import { AriaRole } from '../../../types';

/**
 * List of all possibles roles
 */
export const roles = ['progressbar', 'meter'] as const;

/**
 * Aria Role type from roles
 */
export type AriaRoleType = AriaRole & (typeof roles)[number];
