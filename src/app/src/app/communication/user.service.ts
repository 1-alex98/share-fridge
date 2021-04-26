import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {MemberClass} from "./expense-class";
import {HttpClient} from "@angular/common/http";
import {Member} from "./expense";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private me:MemberClass;
  private cookie:string;

  constructor(private http:HttpClient) { }

  getMe(): Observable<MemberClass> {
    if(this.me && this.cookie == this.getCookie("SESSION")) return of(this.me);

    return this.http.get<Member>("/../api/me").pipe(map(value => MemberClass.fromObject(value)))
      .pipe(
        tap(
          value=> {
            this.me= value;
            this.cookie = this.getCookie("SESSION");
          }
        )
      );
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  logOut(){
    this.me = undefined;
  }
}
