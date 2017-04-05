import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  template: `<h1>Bienvenidos a {{name}}</h1>`
})
export default class AppComponent {
  constructor() {
    this.name = 'Scraaaam';
  }
}
