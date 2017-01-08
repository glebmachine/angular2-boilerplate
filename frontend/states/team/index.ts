import { NgModule } from '@angular/core';

import { StateComponent } from './component';
import { StateRouting } from './routing';
import { one, two } from './treeshakeme';

console.log(one);

@NgModule({
  imports: [StateRouting],
  declarations: [StateComponent],
})
export class MainStateModule { }