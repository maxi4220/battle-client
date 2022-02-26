import Utilities from "../Utilities";
import MainGame from "./game.scene";
import MainSettings from "./settings.scene";
import { EventHandler } from "../handlers/event.handler";
import { UserEvents } from "../constants";
import { FacebookUser } from "../models/facebookUser";
import { AuthHandler } from "../handlers/auth.handler";
import { ColyHandler } from "../handlers/coly.handler";


export default class MainMenu extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "MainMenu";

	public preload(): void {
		// Preload as needed.
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("MainMenu", "create");
		const textYPosition = this.cameras.main.height / 3;

		const newGameText = this.add.text(this.cameras.main.centerX, textYPosition, "Start");
		newGameText
			.setFontFamily("monospace")
			.setFontSize(40)
			.setFill("#fff")
			.setAlign("center")
			.setOrigin(0.5);
		newGameText.setInteractive();
		
		newGameText.on("pointerdown", () => { 
			if ( !sessionStorage.getItem("fb_userId") || 
					 !sessionStorage.getItem("fb_accessToken") ||
					 !sessionStorage.getItem("fb_name") ||
					 !sessionStorage.getItem("fb_expiresIn") ) {
				window["FB"].login( ( facebookUser: FacebookUser ) => {
					if ( facebookUser.status === "connected" ) {

						console.log("Validating facebook user token: " + facebookUser.authResponse.userID);

						AuthHandler.validateFBUserToken( facebookUser)
						.then((result)=>{
							if ( result && result.data ) {
								
								facebookUser.authResponse.accessToken = result.data.accessToken;
								facebookUser.authResponse.userID = result.data.id;
								facebookUser.authResponse.name = result.data.name;

								sessionStorage.setItem("fb_accessToken", facebookUser.authResponse.accessToken);
								sessionStorage.setItem("fb_userId", facebookUser.authResponse.userID);
								sessionStorage.setItem("fb_name", facebookUser.authResponse.name);
								sessionStorage.setItem("fb_expiresIn", facebookUser.authResponse.expiresIn.toString());
								
								this.joinRoom( facebookUser );
							} else {
								console.log("token not valid");
							}
						})
						.catch( ( error ) => { console.log(error); });						
					} else {
						console.log("not connected?");
					}
					
				});

			} else {
				const facebookUser = new FacebookUser();
				facebookUser.authResponse.accessToken = sessionStorage.getItem("fb_accessToken");
				facebookUser.authResponse.userID = sessionStorage.getItem("fb_userId");
				facebookUser.authResponse.name = sessionStorage.getItem("fb_name");
				facebookUser.authResponse.expiresIn = Number(sessionStorage.getItem("fb_expiresIn"));

				this.joinRoom( facebookUser );
			}
			
		}, this);

		const settingsText = this.add.text(this.cameras.main.centerX, textYPosition * 2, "Settings");
		settingsText.setOrigin(0.5);
		settingsText.setFontFamily("monospace").setFontSize(30).setFill("#fff");
		settingsText.setInteractive();
		settingsText.on("pointerdown", () => { this.scene.start(MainSettings.Name); }, this);
	}

	private joinRoom( facebookUser: FacebookUser ){
		
		ColyHandler.joinRoom( facebookUser)
		.then( ( result ) => {
			
			this.scene.start(MainGame.Name);
			console.log("Hello, ", facebookUser.authResponse.name, "!");

		}).catch( ( error ) => {
			console.log( error );
		});
	}
	public update(): void {
		// Update logic, as needed.
	}
}
