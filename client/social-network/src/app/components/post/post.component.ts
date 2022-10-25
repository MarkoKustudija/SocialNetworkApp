import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  loggedIn: boolean;

  @Input() post: Post;

  constructor(private appService: AppService, private dataService: DataService, private router: Router) { 
    this.post = {
      id: -1,
      user: null,
      time: new Date(),
      content: ''
      }
    this.loggedIn = false;
  }

  ngOnInit(): void {
    if(window.localStorage.getItem('loggedUser') != null){
      this.loggedIn = true;
      this.dataService.changeLoginStatus(true);
    } else {
      this.loggedIn = false;
    }
    this.dataService.login.subscribe(val => {
      this.loggedIn = val;
    })
  }

  editPost(){
    this.dataService.updateEditStatus(true);
    this.dataService.setIdForEdit(this.post.id);
  }

  deletePost(id: number) : void {
    this.appService.deletePost(id).subscribe((res: Post) => {
      this.router.navigate(['/home']);
    });
  }

}
