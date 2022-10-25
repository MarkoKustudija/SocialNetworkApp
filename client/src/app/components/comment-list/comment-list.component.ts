import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/service/comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  comments: Comment[];

  @Output() deleteCommentIndex: EventEmitter<number> = new EventEmitter();

  constructor(private commentService: CommentService) {
    this.comments = [];
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.fetchComments();
  }
}
