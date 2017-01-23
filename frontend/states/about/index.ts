import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StateComponent } from './component';
import { StateRouting } from './routing';

@NgModule({
  imports: [
    StateRouting,
    FormsModule
  ],
  declarations: [StateComponent],
})
export class MainStateModule { }