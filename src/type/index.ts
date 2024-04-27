// types/index.ts
export interface User {
    account: string;
    password: string;
    identity: string;
    user_id: number;
}

export interface State {
    user: User | null;
}
