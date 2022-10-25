import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { LoggingInterceptorService } from './service/logging-interceptor.service';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    ErrorPageComponent,
    PageNotFoundComponent,
    HomeComponent,
    CommentListComponent,
    CommentDetailsComponent,
    AddCommentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
