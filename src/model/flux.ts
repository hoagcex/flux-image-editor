export interface Workflow {
	name?: string;
	image?: string;
	description?: string;
	enable_in_simple?: boolean;
}

export interface WorkFlowResponse {
	workflows?: Workflow[];
}
