import type { Size } from '../../../types';
/**
 * List of all possibles sizes
 */
export const sizes = ['small', 'medium', 'large', 'xlarge'] as const;
/**
 * Table Size from sizes
 */
export type TableSizeType = Size & (typeof sizes)[number];
/**
 * List of all possibles alignments
 */
export const alignments = ['left', 'center', 'right'] as const;
/**
 * Text align type
 */
export type TextAlignType = (typeof alignments)[number];
/**
 * Column align type
 */
export type ColumnsAlignmentType = TextAlignType | TextAlignType[] | { [key: number]: TextAlignType };
