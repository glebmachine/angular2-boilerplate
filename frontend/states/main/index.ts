import { NgModule, OnInit } from '@angular/core';

import { StateComponent } from './component';
import { StateRouting } from './routing';

@NgModule({
  imports: [ StateRouting ],
  declarations: [ StateComponent ],
})
export class MainStateModule implements OnInit {
  ngOnInit() {
    console.log('wow');
  }
}