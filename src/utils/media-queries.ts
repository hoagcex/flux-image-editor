type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
type BreakpointMediaQueryMap = Record<Breakpoint, string>;
type BreakpointValueMap = Record<Breakpoint, number>;

/**
 * mobile first breakpoint media queries
 */
export const breakpoint: BreakpointMediaQueryMap = {
	xs: `@media (max-width: 640px)`,
	sm: `@media (min-width: 640px)`,
	md: `@media (min-width: 768px)`,
	lg: `@media (min-width: 1024px)`,
	xl: `@media (min-width: 1280px)`,
	xxl: `@media (min-width: 1536px)`,
};

/**
 * alias for breakpoint
 */
export const bp = breakpoint;

export const breakpointValue: BreakpointValueMap = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
};

export const bpValue = breakpointValue;

export const up = (bp: Breakpoint) => {
	return `@media (min-width: ${breakpointValue[bp]}px)`;
};

export const upBp = (bp: Breakpoint) => {
	return `(min-width: ${breakpointValue[bp]}px)`;
};

export const downBp = (bp: Breakpoint) => {
	return `(max-width: ${breakpointValue[bp] - 0.03}px)`;
};

export const down = (bp: Exclude<Breakpoint, "xs">) => {
	return `@media (max-width: ${breakpointValue[bp] - 0.03}px)`;
};

export const between = (startBp: Exclude<Breakpoint, "xs">, endBp: Exclude<Breakpoint, "md">) => {
	return `@media (min-width: ${breakpointValue[startBp] - 0.03}px) and (max-width: ${
		breakpointValue[endBp] - 0.03
	}px)`;
};

export const screenUp = (size: number) => `(min-width: ${size}px)`;

export const screenDown = (size: number) => `(max-width: ${size}px)`;
