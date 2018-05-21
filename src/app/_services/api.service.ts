import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Events } from 'ionic-angular';

@Injectable()
export class ApiService {
	
	currentUser = undefined;

	constructor(private _http: Http, private _events: Events) {
		this._events.subscribe('app:login', (currentUser) => { this.currentUser = currentUser; });
	}

	getHeaders(username, password) {
		let headers: Headers = new Headers(); // TO ANSWER: Why do we use new here, but inject the others?
		headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
		headers.append("Content-Type", "application/x-www-form-urlencoded");

		return headers;
	}

	get(url: string) {
		let user = this.currentUser;

	    let username: string = user["name"];
	    let password: string = user["password"];

	    return this.getWithUsernameAndPassword(url, username, password);
	}

	getWithUsernameAndPassword(url: string, uName: string, uPW: string) {
		let headers: Headers = this.getHeaders(uName, uPW);
		return this._http.get(url, {headers: headers});
	}

	post(url: string, data: string) {
		let user = this.currentUser;

	    let username: string = user["name"];
	    let password: string = user["password"];

		let headers: Headers = this.getHeaders(username, password);
	    return this._http.post(url, data, {headers: headers});
	}

	postUnsecuredAPI(url: string, data: string) {
		let headers: Headers = new Headers(); // TO ANSWER: Why do we use new here, but inject the others?
		headers.append("Content-Type", "application/x-www-form-urlencoded");

	    return this._http.post(url, data, {headers: headers});
	}

	delete(url: string) {
		let user = this.currentUser;

	    let username: string = user["name"];
	    let password: string = user["password"];

		let headers: Headers = this.getHeaders(username, password);

	    return this._http.delete(url, {headers: headers});
	}
}