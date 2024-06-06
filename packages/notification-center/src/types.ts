import type { MgAlert } from '@mgdis/mg-components/dist/components/mg-alert';
import type { MgMessage } from '@mgdis/mg-components/dist/components/mg-message';

export type NotificationData = {
  content: string;
  variant?: MgAlert['variant'] | MgMessage['variant'];
  delay?: number;
  context?: string;
  appId?: string;
};
