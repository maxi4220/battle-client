import axios from "axios";
import { URLs } from "../constants";
import { env } from "../environment";
import { FacebookUser } from "../models/facebookUser";
import Utilities from "../Utilities";

export class AuthHandler {
    static validateFBUserToken( fbUser: FacebookUser) {
		let url = env.expressServer + "/" + 
            Utilities.BuildGetURL(URLs.auth.checkToken, [
            fbUser.authResponse.userID,
            fbUser.authResponse.accessToken
        ]);
        // Call the server
        return axios.get(url);
    }
}
