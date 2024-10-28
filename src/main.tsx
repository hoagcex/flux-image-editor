import { QueryProvider } from "@/network";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (import.meta.env.REACT_APP_ENV !== "dev") console.log = () => {};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryProvider>
			<App />
		</QueryProvider>
	</React.StrictMode>,
);
