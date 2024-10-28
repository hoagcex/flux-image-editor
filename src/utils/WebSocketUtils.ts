export enum WSResponseType {
	RELOAD_ROLE = "RELOAD_ROLE",
	LEAVE = "LEAVE",
}

export interface WSResponse {
	type: WSResponseType.RELOAD_ROLE | WSResponseType.LEAVE;
	content?: string;
	sender?: string;
}

export const DecodeResponse = (body: Uint8Array): WSResponse | null | undefined => {
	const binaryData = new Uint8Array(body);
	const jsonString = new TextDecoder().decode(binaryData);

	try {
		const receivedMessage = JSON.parse(jsonString) as WSResponse | undefined;

		return receivedMessage;
	} catch (error) {
		console.error("Error parsing JSON:", error);
	}

	return null;
};
