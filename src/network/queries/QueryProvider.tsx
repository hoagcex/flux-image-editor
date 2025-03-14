import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export const QueryProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
