/**
 * List of all possibles roles
 */
export const roles = ['form', 'search', 'none', 'presentation'] as const;

/**
 * Aria Role type from roles
 */
export type AriaRoleType = (typeof roles)[number];

/**
 * List of all possibles required message status
 */
export const requiredMessageStatus = ['default', 'hide'] as const;

/**
 * RequiredMessageStatus type from requiredMessageStatus
 */
export type RequiredMessageStatusType = (typeof requiredMessageStatus)[number];
