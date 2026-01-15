// Import Jodit types
import type { IJodit, ButtonsOption } from 'jodit/esm/types';
// Import Sanitizer type
import type { Sanitizer } from '@mgdis/sanitize-html';

/**
 * Configuration options for defineEditor function
 * Combines component-specific options with Jodit configuration
 */
export type DefineEditorConfig = {
  value: string;
  readOnly?: boolean;
  placeholder?: string;
  modules?: ButtonsOption;
  editorHeight?: number;
  handleTextChange: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
};

// Export Jodit types for external use
export type { IJodit, ButtonsOption };

// Export Sanitizer type for external use
export type { Sanitizer };

// Type aliases for tags and attributes
export type TagList = string[];
export type TagAttributes = Record<string, string[]>;
