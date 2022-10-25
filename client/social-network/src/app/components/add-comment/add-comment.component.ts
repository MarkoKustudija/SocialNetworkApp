import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  postId: number;
  public newComment: Comment;
  public user!: User;
 public post : Post;




  constructor(private appService: AppService, private dataService : DataService, private router: Router) { 
    this.postId = -1;
    this.post = {
      id: -1,
      user: null,
      time: new Date(),
      content: '',
    };
    this.newComment = new Comment({
      id: -1,
      user: JSON.parse(window.localStorage['loggedUser']),
      post: this.post,
      time: new Date(),
      content: '',
    }) ;
    


  }

  ngOnInit(): void {
    this.dataService.idForComment.subscribe(id => {
      this.postId = id;
      this.getPost();
    })
    this.getUser();
    
  }

  addComment(){
    console.log(this.newComment)
    this.appService.addComment(this.newComment).subscribe((response) => {
      this.newComment = response;
      console.log(this.newComment)

      this.router.navigate(['/home']);
    })
         
  }

  resetComment(): void {

    this.newComment = {
      id: -1,
      user: {
        id: -1,
        firstName: '',
        lastName: '',
        username: '',
      },
      post: this.post,
      time: new Date(),
      content: '',
    };
  
    this.router.navigate(['/home']);

  }
  getUser(): void {
    this.user = JSON.parse(window.localStorage['loggedUser']);
  }

getPost(){

this.appService.getPost(this.postId).subscribe((res: Post ) => {
  this.post = res;
  this.newComment.post = res;
} )

}



}
