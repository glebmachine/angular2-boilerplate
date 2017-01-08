import { NgModule } from '@angular/core';

import { StateComponent } from './component';
import { StateRouting } from './routing';

@NgModule({
  imports: [StateRouting],
  declarations: [StateComponent],
})
export class MainStateModule { }