import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/service/comments.service';
import { Comment } from 'src/app/model/comment.model';
import { Post } from 'social-network/src/app/model/post.model';
import { User } from 'social-network/src/app/model/user.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  public newComment : Comment;
  public post : Post;
  public user : User;

  constructor(private commentService : CommentService, private router : Router) {
    // this.newComment = new Comment({
    //   commentId: '',
    //   content: '',
    //   post: {},
    //   user: {}
    // })
   }

  ngOnInit(): void {
  }

  

  addComment(){
    this.commentService.addComment(this.newComment).subscribe((res: Comment) =>{
       this.newComment = res;
       this.router.navigate(['/comments']);
    })
  }

}
