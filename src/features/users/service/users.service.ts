import * as repo from "../repository/users.repository";
import type { CreateUser, UserCredentials } from "../types/users.types";

export const userService = {
	async getUser(credentials: UserCredentials) {
		return repo.getUser(credentials);
	},

	async createUser(credentials: UserCredentials) {
		console.log(credentials);
		const userWithId: CreateUser = {
			id: crypto.randomUUID(),
			username: credentials.username,
			password: credentials.password,
		};
		console.log(userWithId);
		return repo.createUser(userWithId);
	},
};
