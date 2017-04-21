import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'; import 'rxjs/add/operator/toPromise'
import { RouterModule }  from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import AppComponent from './app/components/app.component'
import ProjectComponent from './app/components/project.component'
import ProjectDetailComponent from './app/components/projectDetail.component'
import ProjectListComponent from './app/components/projectList.component'
import NewProjectComponent from './app/components/newProject.component'
import NewTaskComponent from './app/components/newTask.component'
import TaskListComponent from './app/components/taskList.component'
import TaskComponent from './app/components/task.component'
import TaskDetailComponent from './app/components/taskDetail.component'
import CommentComponent from './app/components/comment.component'
import CommentListComponent from './app/components/commentList.component'

let router = RouterModule.forRoot([
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'projects/:id/tasks', component: ProjectDetailComponent },
  { path: 'projects/:id/tasks/:taskId', component: TaskDetailComponent }
], { useHash: true })

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule, InfiniteScrollModule ],
  styleUrls: ['./style.css', './buttons.css'],
  declarations: [
    CommentListComponent,
    CommentComponent,
    TaskDetailComponent,
    TaskComponent,
    TaskListComponent,
    NewTaskComponent,
    NewProjectComponent,
    ProjectListComponent,
    ProjectComponent,
    ProjectDetailComponent,
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
