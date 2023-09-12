/**
 * List of all possibles dialog roles
 */
export const dialogRoles = ['dialog', 'alertdialog'] as const;

/**
 * DialogRole type from dialog roles
 */
export type DialogRoleType = (typeof dialogRoles)[number];
