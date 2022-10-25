import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  newPost: Post;
  posts: Post[];
  page: number;
  size: number;
  loggedIn: boolean;

  constructor(private appService: AppService, private dataService: DataService) { 
    this.newPost = {
      id: -1,
      user: {
        id: -1,
        firstName: '',
        lastName: '',
        username: '',
      },
      time: new Date(),
      content: '',
    };
    this.posts = [];
    this.page = 0;
    this.size = 10;
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.getPosts();
    if(window.localStorage.getItem('loggedUser') != null){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.dataService.login.subscribe(val => {
      this.loggedIn = val;
    })
  }

  getPosts(){
    this.appService.getPosts(this.page, this.size).subscribe((res: Post[]) => {
      this.posts = res;
    });
  }

  // addPost(newPost:any){
  //   this.appService.addPost(newPost).subscribe((response) => {
  //     console.log(newPost);
  //     this.getPosts();
  //   })
         
  // }

  viewPost(post: Post){
    this.dataService.setPostForView(post.id);
  }

  setPostForComment(index: number){
    this.dataService.changePostForComment(index);
  }


}
