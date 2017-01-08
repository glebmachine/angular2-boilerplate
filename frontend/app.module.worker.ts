import 'zone.js';

import { NgModule }      from '@angular/core';
import { AppComponent }  from './app.component';
import { RouterModule }  from '@angular/router';
import { WorkerAppModule, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-webworker';
import { APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MainStateModule } from './states/main/index';
import { StateComponent } from './states/main/component';

@NgModule({
  imports: [
    WorkerAppModule,
    // RouterModule,
    // RouterModule.forRoot([
    //   // { path: '', redirectTo: '/main', pathMatch: 'full' },
    //   { path: '', component: MainStateModule, },
    //   // { path: '', loadChildren: './states/main/index#MainStateModule?sync=true&chunkName=main' },
    //   // { path: 'team', loadChildren: './states/team/index#MainStateModule?sync=true' },
    //   // { path: 'about', loadChildren: './states/about/index#MainStateModule?sync=true' },
    // ])
  ],
  providers: [
    // Location,
    // WORKER_APP_LOCATION_PROVIDERS,
    // {provide: APP_BASE_HREF, useValue: '' },
    // {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  declarations: [ StateComponent ],
  bootstrap:    [ StateComponent ]
})
export class AppModule { }