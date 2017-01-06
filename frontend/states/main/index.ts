import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateComponent } from './component';

const routes: Routes = [
  { path: '', component: StateComponent },
];

// Модуль, отвечающий за внутренний роутинг в стейте
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class StateRouting { }

// Модуль, отвечающий за весь компонент стейта
@NgModule({
  imports: [StateRouting],
  declarations: [StateComponent],
})
export class MainStateModule { }