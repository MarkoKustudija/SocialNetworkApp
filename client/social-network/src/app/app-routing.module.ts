import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { MyCommentsComponent } from './components/my-comments/my-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'add', component: AddPostComponent },
  { path: 'comments', component: MyCommentsComponent },
  {path: 'posts', component: MyPostsComponent},
  { path: 'add-comment', component: AddCommentComponent },
  { path: 'post/:id', component: ShowPostComponent, pathMatch: 'full'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
