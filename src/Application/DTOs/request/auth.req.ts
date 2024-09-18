export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  resetKey: string;
  newPassword: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
