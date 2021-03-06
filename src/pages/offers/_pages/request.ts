import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import { RequestsService } 	from '../../../app/_services/requests.service';
import { UserService } 		from '../../../app/_services/user.service'

@Component({
  selector: 'page-search-request',
  templateUrl: 'request.html'
})
export class RequestPage {

	offer = undefined;
	message = undefined;
	callback = undefined;
	
	constructor(public navCtrl: NavController, 
				public params: NavParams,
				private viewCtrl: ViewController, 
				private _requestsService: RequestsService,
				private _userService: UserService) {
		this.offer = params.get('offer');
		this.callback = params.get('callback') || undefined;
	}

	ngOnInit() {

	}

	requiredUserRecommendationsAsUserObjects = undefined;
	getRequiredUserRecommendations() {
		if (this.requiredUserRecommendationsAsUserObjects === undefined) {
			this.requiredUserRecommendationsAsUserObjects = null;
			this.initRequiredUserRecommendationsAsUserObjects();
		}

		return this.requiredUserRecommendationsAsUserObjects;
	}

	initRequiredUserRecommendationsAsUserObjects() {
		let self = this;
		self.offer["requiredUserRecommendations"].map((obj) => {
			self._userService.getUser(obj["requiredRecommendUserId"]).then((user) => {
				if (self.requiredUserRecommendationsAsUserObjects === null) 
					self.requiredUserRecommendationsAsUserObjects = [];

				self.requiredUserRecommendationsAsUserObjects.push(user);
			})
		})
	}

	isSaveBtnEnabled() {
		return true;
	}

	onSaveBtnTap(evt) {
		this._requestsService.saveNew(this.offer, this.message).then((data) => {
			if (this.callback)
				this.callback(true).then(() => {
					this.viewCtrl.dismiss({ });
				});
		});
	}

	onCancelBtnTap(evt) {
		this.viewCtrl.dismiss();
	}

	getMessageValue() {
		return this.message;
	}

	onMessageChange(evt) {
		this.message = evt._value;
	}
}
