import 'reflect-metadata'
import 'zone.js'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/toPromise'
import {RouterModule}  from '@angular/router';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MomentModule} from 'angular2-moment';

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
import MilestoneComponent from './app/components/milestone/milestone.component'
import ActiveViewComponent from './app/components/activeView.component'
import TaskFrameComponent from './app/components/taskFrame.component'

let router = RouterModule.forRoot([
    {path: '', redirectTo: '/projects', pathMatch: 'full'},
    {path: 'projects', component: ProjectListComponent},
    {path: 'projects/:id', component: ActiveViewComponent},
    {path: 'projects/:id/tasks/:taskId', component: ActiveViewComponent}
], {useHash: true})

@NgModule({
    imports: [router, BrowserModule, FormsModule, HttpModule, InfiniteScrollModule, MomentModule],
    styleUrls: ['./style.css', './buttons.css'],
    declarations: [
        TaskFrameComponent,
        ActiveViewComponent,
        MilestoneComponent,
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
    bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule)
