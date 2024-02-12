import type { ConfigType } from './mg-angular-logger.conf';

/**
 * Set window logger custom rules for angular and mg-components
 * @param config - logger configuration object
 * @example
 * ```js
 * // main.js
 * import { defineCustomElements } from '@mgdis/mg-components/loader';
 * import { setMgAngularLogger } from '@mgdis/mg-components-helpers/angular';
 *
 * // need to be set before `defineCustomElements` call
 * setMgAngularLogger({level: 'error'});
 * defineCustomElements();
 * ```
 */
export const setMgAngularLogger = (config: ConfigType = { level: 'log' }): void => {
  const error = console.error;
  console.error = (...args: unknown[]) => {
    // filter error when it come from a mg-components component error
    if (config.level === 'error' || !args.some(arg => arg instanceof Error && arg.message.startsWith('<mg-'))) error.call(console, ...args);
  };
};
