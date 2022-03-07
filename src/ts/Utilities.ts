import 'phaser';

export default class Utilities {
	/**
	 * Logs a particular message to the console.
	 * @param message Message to log.
	 */
	public static Log(message: string): void {
		console.log((new Date()).toISOString() + " : " + message);
	}

	/**
	 * Logs the start of a method in a scene.
	 * @param sceneName Name of the scene.
	 * @param method Method called within the scene.
	 */
	public static LogSceneMethodEntry(sceneName: string, method: string): void {
		this.Log("Entered " + sceneName + " " + method + "()");
	}

	/**
	 * Builds the URL for gets with queryString
	 * @param url url to where make the request
	 * @param params array of params that will be part of the url
	 */
	public static BuildGetURL(url: string, params: Array<any>) {
		const paramPositions = url.split("/");
		let i = 0;
		for ( let pos in paramPositions ) {
			if ( paramPositions[pos].indexOf(":") > -1 ) {
				paramPositions[pos] = params[i];
				i++;
			}
		}		
		return paramPositions.join("/");
	}
	/**
 	* Gets the value of a cookie
 	* @param name 
 	*/
	public static GetCookie(name: string) {
		name = name + "=";
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
}
