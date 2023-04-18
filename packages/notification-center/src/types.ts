export type MessageData = {
	content: string;
	variant?: Variant;
	delay?: number;
	context?: string;
	appId?: string;
};

export type Variant = 'info' | 'success' | 'danger' | 'warning';
