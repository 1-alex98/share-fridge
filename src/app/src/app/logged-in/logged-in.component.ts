import { Component, OnInit } from '@angular/core';
import {UserService} from "../communication/user.service";

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  loggedIn = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(value => {
      this.loggedIn= true
    }, error => this.loggedIn=false)
  }

}
