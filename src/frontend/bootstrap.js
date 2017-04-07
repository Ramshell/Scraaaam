import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'; import 'rxjs/add/operator/toPromise'
import { RouterModule }  from '@angular/router';

import AppComponent from './app/components/app.component'
import ProjectDetailComponent from './app/components/projectDetail.component'

let router = RouterModule.forRoot([
  { path: 'projects/:id', component: ProjectDetailComponent }
], { useHash: true })

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule ],
  styleUrls: ['./style.css'],
  declarations: [
    ProjectDetailComponent,
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
