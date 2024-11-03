export interface Workflow {
	name?: string;
	image?: string;
	description?: string;
	enable_in_simple?: boolean;
	workflow?: string;
	prompt?: string;
	custom_params?: string;
}

export interface WorkFlowListResponse {
	workflows?: Workflow[];
}

export interface WorkFlowResponse {
	result?: Workflow;
}
export interface CurrentStatusResponse {
	status?: {
		waiting_gens?: number;
		loading_models?: number;
		waiting_backends?: number;
		live_gens?: number;
	};
	backend_status?: {
		status?: string;
		class?: string;
		message?: string;
		any_loading?: boolean;
	};
	supported_features: string[];
}
