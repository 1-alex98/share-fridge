import { Component, OnInit } from '@angular/core';
import {UserService} from "../../communication/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PoolService} from "../../communication/pool.service";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  loggedIn: boolean= null;
  id: String;

  constructor(private userService:UserService, private route:ActivatedRoute, private poolService:PoolService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(value => {
      if(value){
        this.sendInvite()
      }else {
        this.notLoggedIn()
      }
    }, error => this.notLoggedIn())
  }

  private sendInvite() {
    this.route.queryParams.subscribe(value => {
      let token = value["token"];
      if(!token){
        alert("Query Parameter token needed!");
        return;
      }
      this.poolService.join(token)
        .subscribe(id=> this.id=id);
    })
  }

  private notLoggedIn() {
    InviteComponent.setCookie("redirect", window.location.href, "/");
    this.loggedIn = false;
  }

  private static setCookie(name: string, value: string, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + 600 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}; SameSite=Lax`;
  }

}
