
export interface IUser {
    name: string;
    email: string;
}

export interface IAuthState {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}