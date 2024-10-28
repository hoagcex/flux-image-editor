import { lazy, ComponentType } from "react";

export const lazily = <T extends object, U extends keyof T>(loader: (x?: string) => Promise<T>) =>
	new Proxy({} as unknown as T, {
		get: (_, componentName: string | symbol) => {
			if (typeof componentName === "string") {
				return lazy(() =>
					loader(componentName).then((x) => ({
						default: x[componentName as U] as unknown as React.ComponentType<unknown>,
					})),
				);
			}
		},
	});

export const lazyMinLoadTime = <T extends ComponentType<any>>(
	factory: () => Promise<{ default: T }>,
	minLoadTimeMs = 500,
) =>
	lazy(() =>
		Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(
			([moduleExports]) => moduleExports,
		),
	);
