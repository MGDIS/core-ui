import { MgMessage } from '@mgdis/mg-components/dist/components/mg-message';

export type MessageData = {
	content: string;
	variant?: MgMessage['variant'];
	delay?: number;
	context?: string;
	appId?: string;
};
