export interface FormData {
    account: string;
    password: string;
    repassword?: string;
    identity?: string;
}

export interface forgetData {
    account: string;
    email: string;
    password: string;
    repassword: string;
}