import { Component } from '@angular/core';
import { AppStore, State } from './app.store';

@Component({
  selector: 'application',
  template: `
    <h1>Hello World Application!</h1>
     <a routerLink="">Main</a>
     <a routerLink="team">Team</a>
     <a routerLink="about">About</a>
     <input type="text" [(ngModel)]="state.text" />
     <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  state: State;
  constructor(public appStore:AppStore) {
    this.state = this.appStore.getState();
  }
}