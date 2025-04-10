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
	step: number;
	images?: ImageTemplate[];
	setStep: (step: number) => void;
	increaseStep: () => void;
	setImages: (images?: ImageTemplate[]) => void;
	setImageUrl: (imageName: string, imageUrl: string) => void;
	pushImage: (image: ImageTemplate) => void;
	clear: () => void;
}

export const useImagesTemplate = create<ImageTemplateProps>((set, get) => ({
	step: 1,
	images: [],
	setStep(step: number) {
		set({ step: step });
	},
	increaseStep() {
		set({ step: get().step + 1 });
	},
	setImages(images?: ImageTemplate[]) {
		set({ images: images });
	},
	setImageUrl(imageName: string, imageUrl: string) {
		const images = get().images?.map((item) => {
			if (item.name === imageName) {
				return { ...item, imageSrc: imageUrl };
			}
			return item;
		});
		set({ images: images });
	},
	pushImage(image?: ImageTemplate) {
		if (image) {
			const images = [...(get().images ?? []), image];
			set({ images: images });
		}
	},
	clear() {
		set({ images: undefined, step: 1 });
	},
}));
