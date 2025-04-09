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

export interface ListImageRequest {
	path: string;
	depth: number;
	sortBy: string;
	sortReverse: boolean;
}

export interface ListImageResponse {
	files?: GeneratedImageT[];
}

export interface GeneratedImageT {
	src?: string;
	metadata?: string;
}

export interface FluxGenerateResp {
	seed?: string;
	fluxguidace?: string;
	steps?: string;
	width?: number;
	height?: number;
	images?: number;
	model?: string;
	session_id?: string;
	prompt?: string;
	status?: boolean;
}

export interface FluxGenResponse {
	image?: string;
	batch_index?: string;
	metadata?: string;
	gen_progress?: GenProcess;
	keep_alive?: boolean;
	socket_intention?: "close" | "open";
}
export interface GenProcess {
	batch_index?: string;
	overall_percent?: number;
	current_percent?: number;
	preview?: string;
}

export interface FluxGenRequest {
	prompt: string;
	sessionId?: string;
	enhancePrompt?: boolean;
	edit?: boolean;
	width: number;
	height: number;
}

export interface ImageTemplate {
	name: string;
	width: number;
	height: number;
	description: string;
	imageSrc?: string;
}
