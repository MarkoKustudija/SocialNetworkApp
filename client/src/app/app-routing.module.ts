import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostComponent },
  {path: 'add-comment', component: AddCommentComponent},
  { path: 'comments', component: CommentComponent },
  { path: 'comment-list', component: CommentListComponent},
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: '404 - Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
