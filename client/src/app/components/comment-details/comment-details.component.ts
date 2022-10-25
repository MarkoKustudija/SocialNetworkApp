import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { CommentService } from 'src/app/service/comments.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

  id: number = -1;

  private sub: any;

  comment: Comment;

  isDataAvailable: boolean = false;

  constructor(private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.isDataAvailable = false;
      this.id = +params['id']; // (+) konvertuje string 'id' u broj

      this.getCommentById(this.id);
    });
  }

  getCommentById(id: number){
    this.commentService.getComment(id).subscribe((res: Comment) => {
      this.comment = res;

      if (res != null)
        this.isDataAvailable = true;
    });

  }

}
