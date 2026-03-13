type Auth = {
    access_token: string;
}

type SubmitReqResetPasswordRequest = {
    email: string;
}

type SubmitReqResetPasswordResponse = {
    message: string;
    status: number;
}

type SubmitResetPasswordRequest = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}
type SubmitResetPasswordResponse = {
    message: string;
    status: number;
}

type SubmitRegisterUserRequest = {
    name: string;
    email: string;
    password: string;
    phone: string;
    dark_mode?: boolean;
    language?: string;
}
type SubmitRegisterUserResponse = {
    message: string;
    status: string;
}

type SubmitLoginRequest = {
    email: string;
    password: string;
}
type SubmitLoginResponse = User
