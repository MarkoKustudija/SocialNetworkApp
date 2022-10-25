import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from './services/app.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'social-network';
  loggedIn: boolean;
  showLogin: boolean;

  constructor(private router: Router, private dataService: DataService) { 
    this.loggedIn = false;
    this.showLogin = false;
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

  logout(){
    window.localStorage.clear();
    this.dataService.changeLoginStatus(false);
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

  toggleLoginComponent(){
    this.showLogin = !this.showLogin;
  }

  login(){
    this.loggedIn = true;
    this.showLogin = false;
    this.router.navigate(['/home']);
  }

  hideLoginModal(){
    this.showLogin = false;
  }
}
