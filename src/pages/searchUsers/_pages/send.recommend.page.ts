import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import { RequestsService } 	from '../../../app/_services/requests.service';
import { DreamService } 	from '../../../app/_services/dream.service'

@Component({
  selector: 'page-search-users-send-recommend',
  templateUrl: 'send.recommend.page.html'
})
export class SendRecommendPage {
	
	user = undefined;

	constructor(public navCtrl: NavController, 
				public params: NavParams,
				private viewCtrl: ViewController) {

		this.user = params.get('user');
	}

	ngOnInit() {

	}

	onSaveBtnTap(evt) {

	}

	onCancelBtnTap(evt) {
		this.viewCtrl.dismiss();
	}
}
