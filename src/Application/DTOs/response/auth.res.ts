export interface ILoginResponse {
    token: string;
    refreshToken: string;
}

export interface ISignUpResponse {
    name: string;
    email: string;
    createdAt: Date;
}

export interface IRefreshTokenResponse {
    token: string;
    refreshToken: string;
}
