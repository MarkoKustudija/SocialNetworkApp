import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from "@angular/router";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  @Output() onLogInClick = new EventEmitter<boolean>();
  @Output() onCancelClick = new EventEmitter<boolean>();

  constructor(private appService: AppService, private router: Router, private dataService: DataService) { 
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }
  
  login(){
    this.appService.validateUser(this.username, this.password).subscribe((res) => {
      if(res != null) {
        window.localStorage.setItem('loggedUser', JSON.stringify(res));
        this.dataService.changeLoginStatus(true);
        this.onLogInClick.emit(true);
      } else {
        alert("Wrong credentials!");
      }      
    });
  }

  hideLoginModal(){
    this.onCancelClick.emit(true);
  }
}
