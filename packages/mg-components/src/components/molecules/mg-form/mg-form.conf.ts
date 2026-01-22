import { AriaRole } from '../../../types';

/**
 * List of all possibles roles
 */
export const roles = ['form', 'search', 'none', 'presentation'] as const;

/**
 * Aria Role type from roles
 */
export type AriaRoleType = AriaRole & (typeof roles)[number];

/**
 * List of all possibles required message status
 */
export const requiredMessageStatus = ['default', 'hide'] as const;

/**
 * RequiredMessageStatus type from requiredMessageStatus
 */
export type RequiredMessageStatusType = (typeof requiredMessageStatus)[number];

/**
 * Type for partial mutation records used in tests
 * Allows type to be string (as inferred from test.each) while maintaining compatibility with MutationRecord
 */
export type PartialMutationRecord = { type: string } & Partial<Omit<MutationRecord, 'type'>>;
