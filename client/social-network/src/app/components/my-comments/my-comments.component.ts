import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user.model';

import { AppService } from 'src/app/services/app.service';

import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent implements OnInit {

  comments: Comment[] ;
  page: number;
  size: number;
  user: User ;

  constructor(private appService: AppService, private dataService: DataService) {
     

    this.comments = [];
    this.page = 0;
    this.size = 10;
    this.user = JSON.parse(window.localStorage['loggedUser'])
     


   }

  ngOnInit(): void {

    this.getComment();


  }
    

   getComment(){
    this.appService.getCommentsForUser(this.user.id ,  this.page, this.size).subscribe((res : any) => {
      this.comments = res;
    });
  }



  viewPost(comment: Comment){
    
  }







}
