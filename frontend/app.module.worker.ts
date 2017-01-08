import 'zone.js';

import { WorkerAppModule, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-webworker';
import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent }  from './app.component';
import { MainStateModule } from './states/main/index';
import { StateComponent } from './states/main/component';

@NgModule({
  imports: [
    WorkerAppModule,
    MainStateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main', loadChildren: './states/main/index#MainStateModule' },
      { path: 'team', loadChildren: './states/team/index#MainStateModule' },
      { path: 'about', loadChildren: './states/about/index#MainStateModule?sync=true' },
    ], { useHash: true }),
  ],
  providers: [
    WORKER_APP_LOCATION_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: '' },
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }