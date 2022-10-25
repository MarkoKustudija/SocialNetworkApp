import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  postId: number;
  post: Post;
  page: number;
  size: number;
  comments: Comment[];

  constructor(private dataService: DataService, private appService: AppService) { 
    this.postId = -1;
    this.post = {
      id: -1,
      user: null,
      time: new Date(),
      content: ''
    }
    this.page = 0;
    this.size = 10;
    this.comments = [];
  }

  ngOnInit(): void {
    this.dataService.view.subscribe(val => {
      this.postId = val;
      if(this.postId != -1){
        this.getPost(this.postId);
      }
    });


    this.getCommentsForPost();
  }

  getPost(id: number) {
    this.appService.getPost(id).subscribe((res: Post) => {
      this.post = res;
    });
  }

  getCommentsForPost() {
    this.appService.getCommentsForPost(this.page, this.size, this.postId).subscribe( (res: Comment[]) => {
      this.comments = res;
      console.log(this.comments);
    })
  }
}
