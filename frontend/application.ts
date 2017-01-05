import { Component } from '@angular/core';

@Component({
  selector: 'application',
  template: `
    <h1>Hello World Application!</h1>
     <a routerLink="">Main</a>
     <a routerLink="about">About</a>
     <router-outlet></router-outlet>
  `,
})
export class AppComponent {}