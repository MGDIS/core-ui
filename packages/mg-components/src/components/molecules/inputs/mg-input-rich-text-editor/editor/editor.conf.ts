// Import Jodit types
import type { IJodit, ButtonsOption } from 'jodit/esm/types';

/**
 * Configuration options for defineEditor function
 * Combines component-specific options with Jodit configuration
 */
export type DefineEditorConfig = {
  value: string;
  name?: string;
  readOnly?: boolean;
  placeholder?: string;
  modules?: ButtonsOption;
  editorHeight?: number;
  handleTextChange: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
};

// Re-export Jodit types for external use
export type { IJodit, ButtonsOption };
