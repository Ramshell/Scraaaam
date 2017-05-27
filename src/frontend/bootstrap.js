import 'reflect-metadata';
import 'zone.js';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ngModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import 'rxjs/add/operator/toPromise';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';

import taskComponent from './app/components/task.component';
import appComponent from './app/components/app.component';
import projectComponent from './app/components/project.component';
import projectListComponent from './app/components/projectList.component';
import editProjectModalComponent from
  './app/components/editProjectModal.component';
import editTaskModalComponent from './app/components/editTaskModal.component';
import taskListComponent from './app/components/taskList.component';
import commentComponent from './app/components/comment.component';
import commentListComponent from './app/components/commentList.component';
import activeViewComponent from './app/components/activeView.component';
import taskFrameComponent from './app/components/taskFrame.component';
import newTaskButtonComponent from './app/components/newTaskButton.component';
import newProjectButtonComponent from
  './app/components/newProjectButton.component';

let router = RouterModule.forRoot([
    {path: '', redirectTo: '/projects', pathMatch: 'full'},
    {path: 'projects', component: ProjectListComponent},
    {path: 'projects/:id', component: ActiveViewComponent},
    {path: 'projects/:id/tasks/:taskId', component: ActiveViewComponent},
], {useHash: true});

@ngModule({
    imports: [
      router,
      BrowserModule,
      FormsModule,
      HttpModule,
      MomentModule,
      InfiniteScrollModule,
    ],
    styleUrls: ['./style.css', './buttons.css'],
    declarations: [
        newProjectButtonComponent,
        newTaskButtonComponent,
        taskComponent,
        taskFrameComponent,
        activeViewComponent,
        commentListComponent,
        commentComponent,
        taskListComponent,
        editTaskModalComponent,
        editProjectModalComponent,
        projectListComponent,
        projectComponent,
        appComponent,
    ],
    bootstrap: [appComponent],
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
