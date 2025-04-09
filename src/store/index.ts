import { SideBarType } from "@/common";
import { ImageTemplate, NewSessionResponse, User } from "@/model";
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

interface SelectedImageStore {
	showMaskEdit: boolean;
	image?: string;
	setImage: (src: string) => void;
	setShowMaskEdit: (show: boolean) => void;
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

export const useSelectedImage = create<SelectedImageStore>((set) => ({
	showMaskEdit: false,
	image: SideBarType.HEADER_NAVBAR,
	setImage(src) {
		set({ image: src, showMaskEdit: true });
	},
	setShowMaskEdit(show) {
		set({ showMaskEdit: show });
	},
	clear: () => {
		set({ image: undefined, showMaskEdit: false });
	},
}));

interface GenLoadingStore {
	loading: boolean;
	prompt?: string;
	sessionId?: string;
	setGen: (prompt?: string, sessionId?: string) => void;
	setLoading: (loading?: boolean) => void;
	clear: () => void;
}
export const useGenLoadingImage = create<GenLoadingStore>((set) => ({
	loading: false,
	prompt: undefined,
	sessionId: undefined,
	setGen(prompt?: string, sessionId?: string) {
		set({ prompt: prompt, sessionId: sessionId, loading: true });
	},
	setLoading(src) {
		set({ loading: src });
	},
	clear: () => {
		set({ loading: false, sessionId: undefined, prompt: undefined });
	},
}));

interface ImageTemplateProps {
	images?: ImageTemplate[];
	setImages: (images?: ImageTemplate[]) => void;
	pushImage: (image: ImageTemplate) => void;
	clear: () => void;
}

export const useImagesTemplate = create<ImageTemplateProps>((set, get) => ({
	images: [
		{
			name: "test",
			width: 128,
			height: 128,
			description: "Test image",
			imageSrc:
				"https://flux.longerthanthelongest.com/View/local/raw/2025-04-09/0336-A%20photorealistic%20close-up%20of%20a%20single%20de-unknown-43.png",
		},
		{
			name: "facebookCover",
			width: 820,
			height: 312,
			description: "Ảnh bìa fanpage",
			imageSrc:
				"https://flux.longerthanthelongest.com/View/local/raw/2025-04-09/0336-A%20photorealistic%20close-up%20of%20a%20single%20de-unknown-43.png",
		},
		{
			name: "zaloCover",
			width: 1000,
			height: 500,
			description: "Ảnh bìa Zalo cá nhân",
			imageSrc:
				"https://flux.longerthanthelongest.com/View/local/raw/2025-04-09/0336-A%20photorealistic%20close-up%20of%20a%20single%20de-unknown-43.png",
		},
	],
	setImages(images?: ImageTemplate[]) {
		set({ images: images });
	},
	pushImage(image?: ImageTemplate) {
		if (image) {
			const images = [...(get().images ?? []), image];
			set({ images: images });
		}
	},
	clear() {
		set({ images: undefined });
	},
}));
