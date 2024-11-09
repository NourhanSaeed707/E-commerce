export type ResetPasswordBody = {
    token: string | string[];
    newPassword: string;
}