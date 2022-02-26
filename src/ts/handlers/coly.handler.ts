import * as Colyseus from "colyseus.js";
import { env } from "../environment";
import { FacebookUser } from "../models/facebookUser";


export class ColyHandler {
	static client = new Colyseus.Client(env.colyServer);
	static room = null;
	
	static joinRoom(fbUser: FacebookUser) {
		return this.room = this.client.joinOrCreate("myRoom", fbUser);
	}

	static get(url: string, queryString: string) {
		let fullUrl = env.expressServer + "/" + url;
		fetch(fullUrl, {
			method: 'GET', // or 'PUT'
			body: JSON.stringify(queryString), // data can be `string` or {object}!
			headers:{
			  'Content-Type': 'application/json'
			}
		  }).then(res => res.json())
		  .catch(error => console.error('Error:', error))
		  .then(response => console.log('Success:', response));
	}

	static post(url: string, data: any) {
		let fullUrl = env.expressServer + "/" + url;
		fetch(fullUrl, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers:{
			  'Content-Type': 'application/json'
			}
		  })
		  .then(res => res.json())
		  .catch(error => console.error('Error:', error))
		  .then(response => console.log('Success:', response));
	}
}
