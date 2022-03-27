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
		
		newGameText.on("pointerdown", this.startNewGame, this);

		const settingsText = this.add.text(this.cameras.main.centerX, textYPosition * 2, "Settings");
		settingsText.setOrigin(0.5);
		settingsText.setFontFamily("monospace").setFontSize(30).setFill("#fff");
		settingsText.setInteractive();
		settingsText.on("pointerdown", () => { this.scene.start(MainSettings.Name); }, this);
	}

	public update(): void {
		// Update logic, as needed.
	}
	
	private startNewGame() {

		const fb_accessToken = Utilities.GetCookie("fb_accessToken");

		if ( !fb_accessToken ) {

			window["FB"].login( ( facebookUser: FacebookUser ) => {
				console.log(facebookUser);
				if ( facebookUser.status === "connected" ) {
					console.log("Validating facebook user token: " + facebookUser.authResponse.userID);
					AuthHandler.validateFBUserToken( facebookUser)
					.then((result)=>{
						if ( result && result.data && result.data.fbUser === undefined ) {
							
							facebookUser.authResponse.accessToken = result.data.accessToken;
							facebookUser.authResponse.userID = result.data.id;
							facebookUser.authResponse.name = result.data.name;
			
							const expiresIn = facebookUser.authResponse.expiresIn.toString();
			
							document.cookie = `fb_accessToken=${facebookUser.authResponse.accessToken};max-age=${expiresIn}`
							document.cookie = `fb_userId=${facebookUser.authResponse.userID};max-age=${expiresIn}`
							document.cookie = `fb_name=${facebookUser.authResponse.name};max-age=${expiresIn}`
							document.cookie = `fb_expiresIn=${expiresIn};max-age=${expiresIn}`
							this.registerLogin( facebookUser );
							this.joinRoom( facebookUser );		
						} else {
							console.log("token not valid");
						}
					})
					.catch( ( error ) => { console.log(error);});	
					
				} else {
					console.log("not connected?");
				}
				
			});

		} else {
			const facebookUser = new FacebookUser();
			facebookUser.authResponse.accessToken = Utilities.GetCookie("fb_accessToken");
			console.log(facebookUser.authResponse.accessToken);
			facebookUser.authResponse.userID = Utilities.GetCookie("fb_userId");
			facebookUser.authResponse.name = Utilities.GetCookie("fb_name");
			facebookUser.authResponse.expiresIn = Number(Utilities.GetCookie("fb_expiresIn"));
			this.registerLogin( facebookUser );
			this.joinRoom( facebookUser );
		}
	}

	private joinRoom( facebookUser: FacebookUser ) {
		ColyHandler.joinRoom( facebookUser)
		.then( ( result ) => {
			
			this.scene.start(MainGame.Name);
			console.log("Hello,", facebookUser.authResponse.name, "!");

		}).catch( ( error ) => {
			console.log( error );
		});
	}

	private registerLogin( fbUser: FacebookUser){
		AuthHandler.registerLogin( fbUser )
		.then((result)=>{
			// ok
			console.log(result);
		})
		.catch((error)=>{
			// fail
			console.log(error);
		});
	}
}
