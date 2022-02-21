export class FacebookUser {
    authResponse: AuthResponse
    status: string
}
export class AuthResponse {
    accessToken: string
    data_access_expiration_time: number
    expiresIn: number
    signedRequest: string
    userID: string
}