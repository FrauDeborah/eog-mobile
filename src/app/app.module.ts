import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { LocalStorageModule } from 'angular-2-local-storage';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { DreamPage } from '../pages/dreams/dreams';
import { ThingPage } from '../pages/things/things';
import { RequestsIncomingPage } from '../pages/requests/incoming/requests.incoming';
import { RequestsOutgoingPage } from '../pages/requests/outgoing/requests.outgoing';
import { RulePage } from '../pages/things/_pages/rule';

import { ApiService } from './_services/api.service';
import { UserService } from './_services/user.service';
import { SearchService } from './_services/search.service';
import { ProfileService } from '../pages/profile/_services/profile.service';
import { RequestsService } from '../pages/requests/_services/requests.service';
import { ThingService } from '../pages/things/_services/thing.service';
import { DreamService } from '../pages/dreams/_services/dream.service';
import { RuleService } from '../pages/things/_pages/_services/rule.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    DreamPage,
    ThingPage,
    RulePage,
    RequestsIncomingPage,
    RequestsOutgoingPage
   , SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LocalStorageModule.withConfig({
        prefix: 'eog-app',
        storageType: 'localStorage'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    DreamPage,
    ThingPage,
    RulePage,
    RequestsIncomingPage,
    RequestsOutgoingPage
    ,SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    UserService,
    RuleService,
    SearchService,
    DreamService,
    ThingService,
    ProfileService,
    RequestsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
