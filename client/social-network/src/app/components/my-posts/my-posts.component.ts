import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts : Post [];
  page: number;
  size: number;
  user: User ;




  constructor(private appService: AppService, private dataService : DataService) {

    this.posts = [];
    this.page = 0;
    this.size = 10;
    this.user = JSON.parse(window.localStorage['loggedUser']);

   }



  ngOnInit(): void {

    this.getPosts();
  }
  getPosts(){
    this.appService.getPostsForUser(this.user.id, this.page, this.size).subscribe((res: Post[] ) =>{
     this.posts = res;
     console.log(this.user.id);
     
    });
  }

  viewPost(post: Post){
    this.dataService.setPostForView(post.id);
  }

 

}
