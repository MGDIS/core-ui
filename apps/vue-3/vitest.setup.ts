import { expect } from 'vitest';
import vueSnapshotSerializer from 'jest-serializer-vue-tjw';

// Add Snapshot Serializer
expect.addSnapshotSerializer(vueSnapshotSerializer);

// Add jest-axe method
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
