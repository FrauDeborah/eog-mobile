export class wrReadyMock {
  public subscribe(): any { return {}; };
}

export class ViewControllerMock { 
    public _setHeader(): any { return {} }; 
    public _setNavbar(): any { return {} };
    public _setIONContent(): any { return {} }; 
    public _setIONContentRef(): any { return {} }; 
    public dismiss(o: any): any { return o; };

    public writeReady: wrReadyMock;
    public readReady: wrReadyMock;

    public unsubscribe(): any { return 0; };

    constructor() {
      this.writeReady = new wrReadyMock();
      this.readReady = new wrReadyMock();
    }
}

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {
 
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }
 
  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return ;
  }

}

export class DeepLinkerMock {

}

export class NavParamsMock {
  static returnParams: any = {};

  public get(key): any {
    if (NavParamsMock.returnParams[key]) {
       return NavParamsMock.returnParams[key];
    }
    return 'No Params of ' + key + ' was supplied. Use NavParamsMock.setParams('+ key + ',value) to set it.';
  }

  static setParams(key,value){
    NavParamsMock.returnParams[key] = value;
  }
}
