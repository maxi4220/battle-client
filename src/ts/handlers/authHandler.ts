import { FacebookUser } from "../models/facebookUser";
import { ColyHandler } from "./colyHandler";

export class AuthHandler {
    static validateFBUserToken( fbUser: FacebookUser, callback: Function) {
        // Call the server
        ColyHandler.post("checkToken", fbUser);
    }
}
