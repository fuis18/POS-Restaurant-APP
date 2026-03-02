import { create } from "zustand";

export interface User {
	id: string;
	username: string;
}

export interface UserStore {
	isLogging: boolean;
	setIsLogging: (isLogging: boolean) => void;
	user: User | null;
	setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	isLogging: false,
	setIsLogging: (isLogging) => set({ isLogging }),
	user: null,
	setUser: (user) => set({ user }),
}));
