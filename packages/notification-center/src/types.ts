import { MgAlert } from '@mgdis/mg-components/dist/components/mg-alert';

export type NotificationData = {
  content: string;
  variant?: MgAlert['variant'] | MgMessage['variant'];
  delay?: number;
  context?: string;
  appId?: string;
};
