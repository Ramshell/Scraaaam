import { Component } from '@angular/core'
import ScraaaamTemplate from '../templates/app.html'

@Component({
  selector: 'app-view',
  template: ScraaaamTemplate
})
export default class AppComponent {
  constructor() {
    this.name = 'Scraaaam'
  }
}
