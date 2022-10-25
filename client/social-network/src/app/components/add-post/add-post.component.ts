import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  public newPost: Post;
  public user!: User;
  isEdit: boolean;
  id: number;
  postForEdit: Post;

  @Output() addPostOnEvent: EventEmitter<Post> = new EventEmitter();
  @Output() resetPostOnEvent: EventEmitter<Post> = new EventEmitter();

  constructor(private appService: AppService, private router: Router, private dataService: DataService) {
    this.newPost = new Post({
      id: -1,
      user: JSON.parse(window.localStorage['loggedUser']),
      time: new Date(),
      content: '',
    });
    this.isEdit = false;
    this.id = -1;
    this.postForEdit = new Post({
      id: -1,
      user: null,
      time: new Date(),
      content: '',
    });
  }

  ngOnInit(): void {
    this.getUser();

    this.dataService.editId.subscribe(id => {
      this.id = id;
    })

    this.dataService.isEdit.subscribe(val => {
      this.isEdit = val;
    })

    if(this.isEdit){
      this.getPost(this.id);
    }
  }

 

   addPost(){
    if(this.isEdit){
      this.appService.editPost(this.id, this.newPost).subscribe((response) => {
        alert('Succesfully updated post.');
        this.newPost = response;
        this.dataService.updateEditStatus(false);
        this.router.navigate(['/home']);
      })
    } else {
      this.appService.addPost(this.newPost).subscribe((response) => {
        alert('Succesfully added new post.');
        this.newPost = response;
        this.router.navigate(['/home']);
      })
    }
 
         
  }



  resetPost(): void {

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
    this.resetPostOnEvent.emit(this.newPost);
    this.router.navigate(['/home']);

  }

  getUser(): void {
    this.user = JSON.parse(window.localStorage['loggedUser']);
  }

  getPost(id: number) {
    this.appService.getPost(id).subscribe((res: Post) => {
      this.newPost = res;
    });
  }
}
