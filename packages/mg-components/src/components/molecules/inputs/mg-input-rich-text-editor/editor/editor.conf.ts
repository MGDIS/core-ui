// Import Jodit types
import type { IJodit, ButtonsOption } from 'jodit/esm/types';

/**
 * Configuration options for defineEditor function
 * Combines component-specific options with Jodit configuration
 */
export type DefineEditorConfig = {
  value: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  modules: ButtonsOption;
  rows?: number;
  handleTextChange: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
};

// Export Jodit types for external use
export type { IJodit, ButtonsOption };
