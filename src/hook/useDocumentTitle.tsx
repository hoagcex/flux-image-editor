import { isEmpty } from "lodash";
import { useEffect } from "react";

export function useDocumentTitle(title?: string) {
	useEffect(() => {
		document.title = isEmpty(title) ? "Photo gen" : title;
	}, [title]);
}
