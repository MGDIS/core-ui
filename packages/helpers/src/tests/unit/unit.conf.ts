/**
 * Define MutationObserver setup function signature
 */
export type SetupMutationObserverMockParams = { disconnect: MutationObserver['disconnect']; observe: MutationObserver['observe']; takeRecords: MutationObserver['takeRecords'] };

/**
 * Define ResizeObserver setup function signature
 */
export type setupResizeObserverMockParams = { disconnect: ResizeObserver['disconnect']; observe: ResizeObserver['observe'] };
