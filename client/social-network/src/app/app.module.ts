import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { MyCommentsComponent } from './components/my-comments/my-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component'; 
import { AddCommentComponent } from './components/add-comment/add-comment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    PostComponent,
    AddPostComponent,
    ShowPostComponent,
    MyCommentsComponent,
    CommentComponent,
    MyPostsComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
