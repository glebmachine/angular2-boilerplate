// Polyfills
import 'reflect-metadata';
import 'zone.js';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './application';
import { RouterModule }  from '@angular/router';

import { MainStateComponent } from './states/main/index';
import { AboutStateComponent } from './states/about/index';

// RxJS
import 'rxjs';

@NgModule({
  imports:      [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main', component: MainStateComponent },
      { path: 'about', component: AboutStateComponent },
    ])
  ],
  declarations: [ AppComponent, MainStateComponent, AboutStateComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }