import { useDocumentTitle } from "@/hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/store";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/react/shallow";

const contextClass = {
	success: "bg-[#DDEDE7] dark:bg-[#182A25] border-[#AFD2C5] dark:border-[#284939]",
	error: "bg-[#FADEE9] dark:bg-[#331928] border-[#F1B5CD] dark:border-[#5C243B]",
	info: "bg-[#E1EAFA] dark:bg-[#1D283A] border-[#B6CCF1] dark:border-[#2C3F61]",
	warning: "bg-[#FFF0D9] dark:bg-[#3A2E1A] border-[#ECCCAD] dark:border-[#5F461F]",
	default: "bg-[#E1EAFA] dark:bg-[#1D283A] border-[#B6CCF1] dark:border-[#2C3F61]",
};

export function ToastProvider() {
	useDocumentTitle();
	const [dgTheme] = useTheme(useShallow((stt) => [stt.theme]));

	return (
		<ToastContainer
			position="bottom-left"
			autoClose={5000}
			// hideProgressBar={true}
			newestOnTop={false}
			pauseOnHover={false}
			closeOnClick
			rtl={false}
			draggable
			theme={dgTheme}
			stacked
			limit={10}
			toastClassName={(props) =>
				twMerge(
					contextClass[props?.type || "default"],
					"min-h-12 font-sans grow relative flex flex-row items-stretch shadow-[rgba(24,26,27,0.18)_0px_13px_20px_1px] border mt-0 mb-4 px-4 py-2 rounded-sm border-solid text-[#24292e] dark:text-white",
				)
			}
		/>
	);
}
