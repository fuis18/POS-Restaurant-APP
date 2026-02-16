export interface CreateUser {
	id: string;
	username: string;
	password: string;
}

export type UserCredentials = Omit<CreateUser, "id">;

export type User = CreateUser;
