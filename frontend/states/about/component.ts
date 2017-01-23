import { Component } from '@angular/core';

@Component({
  templateUrl: './tpl.html',
  styleUrls: [
    './style.styl',
  ],
})
export class StateComponent {
  localState = {
    someVar: 'demo14',
  };

  constructor() {}
}