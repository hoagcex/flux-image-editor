/** @type {import('tailwindcss').Config} */
export default {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#fff",
				primaryColor: "#E0282E",
				backgroundSidebar: "#fff",
				backgroundPageHeader: "#fff",
				backgroundDark: "#242529",
				backgroundPageHeaderDark: "#0E1012",
				dangerColor: "#ff4d4f",
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
	darkMode: "class",
};
