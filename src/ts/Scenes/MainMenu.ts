import Utilities from "../Utilities";
import MainGame from "./MainGame";
import MainSettings from "./MainSettings";
import { EventHandler } from "../handlers/eventHandler";
import { UserEvents } from "../constants";
import { FacebookUser } from "../models/facebookUser";
import { AuthHandler } from "../handlers/authHandler";
import { ColyHandler } from "../handlers/colyHandler";


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
			if ( !sessionStorage.getItem("fb_uid") && !sessionStorage.getItem("fb_accessToken") ) {
				window["FB"].login( ( facebookUser: FacebookUser ) => {
					if ( facebookUser.status === "connected" ) {

						console.log("Validating facebook user token: " + facebookUser.authResponse.userID);



						
						AuthHandler.validateFBUserToken( facebookUser, ( validToken: boolean ) => {
							if ( validToken ) {
								ColyHandler.joinRoom( facebookUser, ( result ) => {
									console.log("res1");
									console.log(result);
									this.scene.start(MainGame.Name);
									console.log("token valid!");
								}, ( a, b, c ) => {
									console.log(a);
									console.log(b);
									console.log(c);
								});
							} else {
								console.log("token not valid");
							}
						});	

						
					} else {
						console.log("not connected?");
					}
					
				});
			}			
			
		}, this);

		const settingsText = this.add.text(this.cameras.main.centerX, textYPosition * 2, "Settings");
		settingsText.setOrigin(0.5);
		settingsText.setFontFamily("monospace").setFontSize(30).setFill("#fff");
		settingsText.setInteractive();
		settingsText.on("pointerdown", () => { this.scene.start(MainSettings.Name); }, this);
	}

	public update(): void {
		// Update logic, as needed.
	}
}
