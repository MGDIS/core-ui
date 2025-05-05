import { expect } from 'vitest';

// Add jest-axe method
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
