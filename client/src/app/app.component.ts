import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './model/post.model';
import { Comment } from './model/comment.model';
import { PostService } from './service/post.service';
import { Subscription } from 'rxjs';
import { CommentService } from './service/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  constructor() {}
}
