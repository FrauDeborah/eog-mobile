import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CreateAccountPage } from './_pages/create.account'

import { UserService } from '../../app/_services/user.service';
import { WebsocketService } from '../../app/_services/websocket.service';
import { PushMessagingService } from '../../app/_services/push.messaging.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {id:-1, name: 'eogadmin', password: 'password'};
  loading = undefined;
  
  constructor(public navCtrl: NavController,
              private _userService: UserService,
              private _websocketService: WebsocketService,
              private _pushMessagingService: PushMessagingService,
              private loadingCtrl: LoadingController) {

  }

  onLoginBtnTap(event) {
    let self = this;
    self.loading = self.loadingCtrl.create({
      content: 'Please wait...'
    })

    self.loading.present();

    this._userService.verifyAndLoginUser(this.user.name, this.user.password).then((userObj) => {
      let pw = self.user.password;
      let un = self.user.name;

      self.user = userObj;
      
      self.user["password"] = pw;
      self.user["name"] = un;

      self._userService.setCurrentUser(self.user);
      self._websocketService.init();
      self._pushMessagingService.init();
      
      self.loading.dismiss();
      this.navCtrl.push(HomePage);
    });
  }

  onCreateAccountBtnTap(event) {
    this.navCtrl.push(CreateAccountPage);
  }

}
