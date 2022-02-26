export class FacebookUser {
  authResponse: AuthResponse
  status: string
  constructor(){
    this.authResponse = new AuthResponse();
  }
}
export class AuthResponse {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  signedRequest: string
  userID: string
  name: string
}