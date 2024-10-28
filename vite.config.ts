import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		envPrefix: "REACT_APP_",
		plugins: [react(), envCompatible(), splitVendorChunkPlugin()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			port: 3000,
			proxy: {
				"/api/": {
					target: process.env.REACT_APP_PROXY_SERVER,
					changeOrigin: true,
					secure: false,
				},
			},
		},
		build: {
			chunkSizeWarningLimit: 1024,
			rollupOptions: {
				output: {
					inlineDynamicImports: false,
					manualChunks: manualChunksFn,
				},
			},
		},
		css: {
			postcss: {
				plugins: [tailwindcss()],
			},
		},
	});
};

function manualChunksFn(id: string) {
	if (id.includes("commonjsHelpers")) return "commonjsHelpers";
	if (id.includes("node_modules")) {
		if (id.includes("antd/es")) {
			return "vendor_antd_es";
		}
		if (id.includes("antd/lib")) {
			return "vendor_antd_lib";
		}
		// if (id.includes("@ant-design")) {
		// 	return "vendor_ant-design";
		// }
		if (id.includes("@antv")) {
			return "vendor_antv";
		}
		if (id.includes("lodash")) {
			return "vendor_lodash";
		}
		if (id.includes("react-router-dom") || id.includes("react-router")) {
			return "vendor_react-router";
		}
		if (id.includes("framer-motion/dist/es")) {
			return "vendor_framer-motion";
		}
		if (id.includes("@dnd-kit")) {
			return "vendor_dnd-kit";
		}
		if (id.includes("react-beautiful-dnd")) {
			return "vendor_beautiful-dnd";
		}
		// if (id.includes("rc-")) {
		// 	return "vendor_rc_t";
		// }
		if (id.includes("chart.js")) {
			return "vendor_chartjs";
		}
		if (id.includes("pdfjs")) {
			return "vendor_pdfjs";
		}
		if (id.includes("@tsparticle")) {
			return "vendor_tsparticle";
		}
		if (id.includes("react-pdf-viewer")) {
			return "vendor_react-pdf-viewer";
		}
		return "vendor";
	}
}
