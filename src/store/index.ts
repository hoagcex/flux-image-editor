import { DGThemeType, SideBarType } from "@/common";
import { GlobalConfig, LoginResponse, SavedAccount, User } from "@/model";
import { encryptString } from "@/utils";
import { isNil } from "lodash";
import Cookies from "universal-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORE_CONST } from "./StoreConst";
const cookies = new Cookies();

interface AuthUserStore {
	user?: User;
	setAuthUser: (user: User) => void;
	doLogin: (res?: LoginResponse) => void;
	doLogout: () => void;
	clear: () => void;
}

interface UserRolesStore {
	roles?: string[];
	setRoles: (roles?: string[]) => void;
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

interface AppConfig {
	showSeasonalTheme?: boolean;
	globalConfig?: GlobalConfig;
	setSeasonalTheme: (seasonal: boolean) => void;
	setGlobalConfig: (config: GlobalConfig | undefined) => void;
}
interface SavedAccountStore {
	account?: SavedAccount[];
	setSavedUser: (user?: User) => void;
	setRemoveAccount: (id?: number) => void;
	setSavedAccounts: (accounts: SavedAccount[]) => void;
}

export const useAuthUserStore = create<AuthUserStore>()(
	persist(
		(set) => ({
			user: undefined,
			doLogin(res?: LoginResponse) {
				cookies.set(import.meta.env.REACT_APP_APIKEY_NAME ?? "access_token", res?.access_token, {
					sameSite: true,
					path: "/",
					expires: isNil(res?.expires_in)
						? new Date(new Date().getTime() + 31536000000)
						: new Date(Number(res?.expires_in)),
				});
				set({ user: res?.user });
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

export const useUserRolesStore = create<UserRolesStore>()(
	persist(
		(set) => ({
			roles: undefined,
			setRoles(roles?: string[]) {
				set({ roles: roles });
			},
			clear: () => {
				set({ roles: undefined });
			},
		}),
		{
			name: STORE_CONST.USER_ROLES,
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

export const useAppConfigStore = create<AppConfig>()(
	persist(
		(set) => ({
			showSeasonalTheme: undefined,
			globalConfig: undefined,
			setSeasonalTheme(seasonal: boolean) {
				set({ showSeasonalTheme: seasonal });
			},
			setGlobalConfig(config: GlobalConfig | undefined) {
				set({ globalConfig: config });
			},
			clear() {
				set({ showSeasonalTheme: undefined });
				set({ globalConfig: undefined });
			},
		}),
		{
			name: STORE_CONST.APP_CONFIG,
			storage: createJSONStorage(() => localStorage),
		},
	),
);
export const useSavedAccountStore = create<SavedAccountStore>()(
	persist(
		(set, get) => ({
			account: [],
			setSavedUser(user?: User) {
				const prevAccounts = get().account ?? [];

				const pw = encryptString(user?.password ?? "");
				if (isNil(prevAccounts.find((item) => item.id === user?.id))) {
					const account: SavedAccount = {
						id: user?.id,
						name: user?.fullName,
						username: user?.username,
						password: pw,
					};
					set({ account: [...prevAccounts, account] });
					return;
				}
				const accounts = prevAccounts.map((item) => {
					if (item.id === user?.id) {
						return {
							...item,
							name: user?.fullName,
							username: user?.username,
							password: pw,
						};
					}
					return item;
				});
				set({ account: accounts });
			},
			setRemoveAccount(id) {
				const accounts = get().account?.filter((item) => item.id !== id) ?? [];
				set({ account: accounts });
			},
			setSavedAccounts(accounts) {
				set({ account: accounts });
			},
			clear() {
				set({ account: [] });
			},
		}),
		{
			name: STORE_CONST.SAVED_ACCOUNT,
			storage: createJSONStorage(() => localStorage),
		},
	),
);
