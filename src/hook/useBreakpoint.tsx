import { bpValue, screenDown, screenUp } from "@/utils";
import { isEmpty, isNumber, throttle } from "lodash";
import { useCallback, useEffect, useState } from "react";
import parser from "ua-parser-js";

const mediaQueryStrings = {
	xs: "(max-width: 640px)",
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	xxl: "(min-width: 1536px)",
} as const;

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

const matchMedia = (breakpoint: Breakpoint | number, ua?: string) => {
	const userAgent = parser(typeof window !== "undefined" ? navigator.userAgent : ua ?? "");
	if (typeof window === "undefined") {
		if (!isNumber(breakpoint)) {
			switch (breakpoint) {
				case "xs":
					return { matches: userAgent.device.type === "mobile" };
				case "sm":
				case "md":
				case "lg":
					return {
						matches:
							(userAgent.device.type !== "mobile" && userAgent.device.type === "tablet") ||
							userAgent.device.type === "window" ||
							!userAgent.device.type,
					};
				default:
					return {
						matches:
							(userAgent.device.type !== "mobile" && userAgent.device.type === "window") ||
							!userAgent.device.type,
					};
			}
		} else {
			if (breakpoint > bpValue.xl) {
				return {
					matches:
						(userAgent.device.type !== "mobile" && userAgent.device.type === "window") ||
						!userAgent.device.type,
				};
			}
			if (breakpoint > bpValue.sm) {
				return {
					matches:
						(userAgent.device.type !== "mobile" && userAgent.device.type === "tablet") ||
						userAgent.device.type === "window" ||
						!userAgent.device.type,
				};
			}
			return { matches: userAgent.device.type === "mobile" };
		}
	}
	return window.matchMedia(
		isNumber(breakpoint) ? (breakpoint > 640 ? screenUp : screenDown)(breakpoint) : mediaQueryStrings[breakpoint],
	);
};

export const useBreakpoint = (ua?: string): Partial<Record<Breakpoint, boolean>> => {
	const [breakpoint, setBreakpoint] = useState<Partial<Record<Breakpoint, boolean>>>({});

	const updateBreakpoint = useCallback(() => {
		setBreakpoint({
			xs: matchMedia("xs", ua).matches,
			sm: matchMedia("sm", ua).matches,
			md: matchMedia("md", ua).matches,
			lg: matchMedia("lg", ua).matches,
			xl: matchMedia("xl", ua).matches,
			xxl: matchMedia("xxl", ua).matches,
		});
	}, [ua]);

	useEffect(() => {
		const observer = new ResizeObserver(throttle(updateBreakpoint, 1000));

		if (isEmpty(breakpoint)) {
			updateBreakpoint();
		}

		observer.observe(document.body);
		return () => {
			observer.unobserve(document.body);
		};
	}, [updateBreakpoint]);

	return breakpoint;
};

useBreakpoint.matchMedia = matchMedia;
