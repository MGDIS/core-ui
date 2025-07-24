import { isValidString } from '@mgdis/core-ui-helpers/dist/utils';
import type { ErrorMessageDetailsType } from './mg-input.conf';

/**
 * Define error message
 * @param message - message to display
 * @param details - message detail to display
 * @returns formated MgInput["errorMessage"]
 */
export const defineErrorMessage = (message: string, details?: ErrorMessageDetailsType['details']): string | ErrorMessageDetailsType | undefined => {
  if (isValidString(message) && isValidString(details)) {
    return {
      summary: message,
      details,
    };
  } else if (isValidString(message)) {
    return message;
  } else {
    return undefined;
  }
};
