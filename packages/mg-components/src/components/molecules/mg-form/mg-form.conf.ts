/**
 * List of all possibles roles
 */
export const roles = ['form', 'search', 'none', 'presentation'] as const;

/**
 * Aria Role type from roles
 */
export type AriaRoleType = (typeof roles)[number];
