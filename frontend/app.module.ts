import 'zone.js';

import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppStore } from './app.store';

import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer,
 } from '@angularclass/hmr';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main', loadChildren: './states/main/index#MainStateModule' },
      { path: 'team', loadChildren: './states/team/index#MainStateModule' },
      { path: 'about', loadChildren: './states/about/index#MainStateModule?sync=true' },
    ])
  ],
  providers: [ AppStore ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    public appRef: ApplicationRef,
  ) {}

  hmrOnInit(store: any) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    console.log('store.state.data:', store.state.data)
    // inject AppStore here and update it
    // this.AppStore.update(store.state)
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  hmrOnDestroy(store: any) {
    var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation)
    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    // store.state = {data: 'yolo'};
    // store.state = Object.assign({}, appState)
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store: any) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts;
    // anything you need done the component is removed
  }
}