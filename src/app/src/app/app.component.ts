import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "./communication/user.service";
import {MemberClass} from "./communication/expense-class";
import {ErrorInterceptor} from "./communication/error.interceptor";
import {ErrorService} from "./communication/error.service";
import {asyncScheduler} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'app';
  me: MemberClass;
  checked: boolean;
  @ViewChild('footer_tag') footer: ElementRef;
  footerHeight: number;
  errorMessage: string[] = [];


  constructor(private userService: UserService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe(
      meUser => this.me = meUser,
      error => this.me = null
    )
    this.errorService.currentError.subscribe(error => {
      let message;
      if(error.error && error.error.message) {
        message = error.error.message;
        if(error.error.path){
          message += " for: "+error.error.path;
        }
      }else {
        message = error.message;
      }
      this.errorMessage.push(message);
      asyncScheduler.schedule(state => {
        this.errorMessage = this.errorMessage.filter(ele=> ele != state);
      }, 20_000, message);
    })

  }

  ngAfterViewInit() {
    this.footerHeight = this.footer.nativeElement.offsetHeight;

  }

  encodeURIComponent(s: string) {
    return encodeURIComponent(s)
  }
}
