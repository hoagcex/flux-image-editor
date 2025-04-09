import { useDocumentTitle } from "@/hook";
import ErrorPage from "@/pages/ErrorPage";
import { AppRoutes } from "@/routes";
import { ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { ToastProvider } from "./components";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale("vi");

function App() {
	useDocumentTitle();

	useEffect(() => {
		document.querySelector("html")?.classList.add("dark");
	}, []);

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					borderRadius: 4,
					// fontFamily: "JetBrains Mono",
				},
			}}
		>
			<div className="h-screen w-screen bg-background dark:bg-backgroundDark overflow-auto">
				<ErrorBoundary
					FallbackComponent={ErrorPage}
					onReset={() => {
						window.location.href = "/";
					}}
				>
					<div className="flex flex-1 overflow-auto justify-between">
						<AppRoutes />
					</div>
					<ToastProvider />
				</ErrorBoundary>
			</div>
		</ConfigProvider>
	);
}

export default App;
