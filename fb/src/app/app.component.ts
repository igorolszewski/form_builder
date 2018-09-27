/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';
import { UtilityService } from '../_services/utility.service';
import { Router } from '@angular/router';


/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.scss'  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public name = 'Angular Starter';
  public tipe = 'assets/img/tipe.png';
  public twitter = 'https://twitter.com/gdi2290';
  public url = 'https://tipe.io';
  public showDevModule: boolean = environment.showDevModule;

  constructor(
    public appState: AppState, private router: Router
  ) {}



  public ngOnInit() {
    

    //'Initial App State', this.appState.state);
  }
public isValid():boolean{
  return false;
}





  

  // public scrollTo(element, to, duration) {
  //   if (duration < 0) return;
  //   var difference = to - element.scrollTop;
  //   var perTick = difference / duration * 2;

  //   setTimeout(function () {
  //     element.scrollTop = element.scrollTop + perTick;
  //     this.scrollTo(element, to, duration - 2);
  //   }, 10);
  // }

  // public scrollToError(targetDiv: string) {
  //   var myDiv = document.getElementById(''+ targetDiv + '');
  //   this.scrollTo(document.body, myDiv.offsetTop, 2000);
  // }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
