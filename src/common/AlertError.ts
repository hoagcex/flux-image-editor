export enum ErrorStatus {
	TO_DO = "TO_DO",
	IN_PROGRESS = "IN_PROGRESS",
	CANCELED = "CANCELED",
	RESOLVED = "RESOLVED",
	// RE_ASSIGNED = "RE_ASSIGNED",
}

export const ErrorStatusMap = [
	{ value: ErrorStatus.TO_DO, label: "Cần xử lý" },
	{ value: ErrorStatus.IN_PROGRESS, label: "Đang thực hiện" },
	{ value: ErrorStatus.RESOLVED, label: "Đã xử lý" },
	// { value: ErrorStatus.CANCELED, label: "Hủy" },
	// { value: ErrorStatus.RE_ASSIGNED, label: "Chọn phụ trách" },
];

export const ErrorStatusColor = {
	TO_DO: { color: "" },
	IN_PROGRESS: { color: "blue" },
	RESOLVED: { color: "green" },
	CANCELED: { color: "volcano" },
};

export const ErrorLevelColor = {
	CRITICAL: { color: "red" },
	HIGH: { color: "orange" },
	MEDIUM: { color: "yellow" },
	LOW: { color: "green" },
};

export enum AlertStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	SILENT = "SILENT",
}

export const AlertStatusMap = [
	{ key: AlertStatus.ACTIVE, value: AlertStatus.ACTIVE, label: "Giám sát" },
	{ key: AlertStatus.INACTIVE, value: AlertStatus.INACTIVE, label: "Không giám sát" },
	{ key: AlertStatus.SILENT, value: AlertStatus.SILENT, label: "Giám sát ngầm" },
];
