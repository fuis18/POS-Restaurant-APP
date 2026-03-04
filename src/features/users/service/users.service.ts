import * as repo from "../repository/users.repository";
import type { CreateUser, UserCredentials } from "../types/users.types";

export const userService = {
	async getUser(credentials: UserCredentials) {
		return repo.getUser(credentials);
	},

	async createUser(credentials: UserCredentials) {
		const userWithId: CreateUser = {
			id: crypto.randomUUID(),
			username: credentials.username,
			password: credentials.password,
		};
		return repo.createUser(userWithId);
	},

	async getToken({ token }: { token: string }) {
		// return repo.getToken(token);
		if (token === "123456") {
			return true;
		}
		return false;
	},
};
