import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { SearchService } from '../../../app/_services/search.service';
import { RuleService } from './_services/rule.service';

@Component({
  selector: 'page-thing-detail-rule',
  templateUrl: 'rule.html'
})
export class RulePage {
	searchString = '';
	matchingUserCountString = undefined;
	pointsQuantity = 0;
	resultList = undefined;
	userList = [];

	constructor(public navCtrl: NavController, 
				private viewCtrl: ViewController, 
				private _searchService: SearchService,
				private _ruleService: RuleService) {

	}

	onSearchUserBtnTap(evt) {
		this._searchService.searchUsers(this.searchString).then((data: Array<Object>) => {
			this.resultList = data;
			this.matchingUserCountString = data.length + " matches found.";
		});
	}

	getMatchingUserCountString() {
		return this.matchingUserCountString;
	}

	handleSearchStringChange(evt) {
		this.matchingUserCountString = undefined;
	}

	isSearchBtnEnabled() {
		return this.searchString.length > 2;
	}

	isSaveBtnEnabled() {
		return this.pointsQuantity > 0;
	}

	isAddBtnEnabled() {
		return this.resultList.some((obj) => { return obj["isSelectedMatch"] === true; })
	}

	isRemoveBtnEnabled() {
		return this.resultList.some((obj) => { return obj["isSelectedRequired"] === true; })
	}

	onMatchingRadioBtnTap(evt) {
		this.resultList.map((obj) => { obj["isSelectedMatch"] = false; if (obj["realname"] === evt) {obj["isSelectedMatch"] = true;} });
	}

	onRequiredRadioBtnTap(evt) {
		this.resultList.map((obj) => { obj["isSelectedRequired"] = false; if (obj["realname"] === evt) {obj["isSelectedRequired"] = true;} });
	}

	addSelectedUser(evt) {
		let user = this.resultList.find((obj) => { return obj["isSelectedMatch"]});
		user["isSelectedRequirement"] = true;
		user["isSelectedMatch"] = false;

		this.userList.push(user);
	}

	removeRequiredUser(evt) {
		let user = this.resultList.find((obj) => { return obj["isSelectedRequirement"]});
		user["isSelectedRequirement"] = false;
		user["isSelectedRequired"] = false;

		this.userList = this.userList.filter((obj) => { return obj["id"] !== user["id"]; });
	}

	getMatchingUserList() {
		if (this.resultList === undefined || this.resultList.length === 0)
			return undefined;

		return this.resultList.filter((obj) => { return !obj.hasOwnProperty("isSelectedRequirement") || obj["isSelectedRequirement"] === false; })
	}

	getRequiredUserList() {
		//if (this.resultList === undefined)
		//	return undefined;

		//return this.resultList.filter((obj) => { return obj["isSelectedRequirement"]; })
		return this.userList;
	}

	onSaveBtnTap(evt) {
		//this.resultList.map((obj) => { delete obj["isSelectedMatch"]; delete obj["isSelectedRequirement"]; });

		this.viewCtrl.dismiss({pointsQuantity: this.pointsQuantity, requiredUsers: this.userList });
	}

	onCancelBtnTap(evt) {
		this.viewCtrl.dismiss();
	}
}
