import type { NotificationCenter } from '@mgdis/notification-center';

export type NotificationCenterWindowType = Window & { NotificationCenter: NotificationCenter };
