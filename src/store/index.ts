import { DGThemeType, SideBarType } from "@/common";
import { GlobalConfig, NewSessionResponse, SavedAccount, User } from "@/model";
import Cookies from "universal-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORE_CONST } from "./StoreConst";
const cookies = new Cookies();

interface AuthUserStore {
	user?: User;
	setAuthUser: (user: User) => void;
	doLogin: (res?: NewSessionResponse) => void;
	doLogout: () => void;
	clear: () => void;
}

interface DGThemeColorConfig {
	primaryColor?: string;
	borderRadius?: number;
}
interface DGThemeStore {
	theme: DGThemeType;
	sidebar: SideBarType;
	colorConfig?: DGThemeColorConfig;
	setTheme: (theme?: DGThemeType) => void;
	setUseSidebar: (sidebarStyle?: SideBarType) => void;
	setColorConfig: (colorConfig?: DGThemeColorConfig) => void;
	clearColorConfig: () => void;
	clear: () => void;
}

interface SelectedImageStore {
	image?: string;
	setImage: (src: string) => void;
	clear: () => void;
}

export const useAuthUserStore = create<AuthUserStore>()(
	persist(
		(set) => ({
			user: undefined,
			doLogin(res?: NewSessionResponse) {
				cookies.set(import.meta.env.REACT_APP_APIKEY_NAME ?? "access_token", res?.session_id, {
					sameSite: true,
					path: "/",
				});
				// set({ user: res?.user });
			},
			setAuthUser(user: User) {
				set({ user: user });
			},
			doLogout() {
				cookies.remove(import.meta.env.REACT_APP_APIKEY_NAME ?? "access_token", { sameSite: true, path: "/" });
				useUserRolesStore.getState().clear();
				set({ user: undefined });
			},
			clear: () => {
				set({ user: undefined });
			},
		}),
		{
			name: STORE_CONST.USER_INFO,
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const useTheme = create<DGThemeStore>()(
	persist(
		(set, get) => ({
			theme: DGThemeType.DARK,
			sidebar: SideBarType.HEADER_NAVBAR,
			colorConfig: undefined,
			setTheme(theme) {
				const currentTheme = get().theme;
				if (theme === currentTheme) return;
				set({ theme: theme });
			},
			setUseSidebar(sidebarStyle) {
				set({ sidebar: sidebarStyle });
			},
			setColorConfig(colorConfig) {
				set({ colorConfig: colorConfig });
			},
			clearColorConfig() {
				set({ colorConfig: undefined });
			},
			clear: () => {
				set({ theme: DGThemeType.LIGHT });
				set({ sidebar: SideBarType.HEADER_NAVBAR });
			},
		}),
		{
			name: STORE_CONST.APP_THEME,
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const useSelectedImage = create<SelectedImageStore>((set) => ({
	image: SideBarType.HEADER_NAVBAR,
	setImage(src) {
		set({ image: src });
	},
	clear: () => {
		set({ image: undefined });
	},
}));
