import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "./communication/user.service";
import {MemberClass} from "./communication/expense-class";
import {ErrorInterceptor} from "./communication/error-interceptor.service";

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
  errorMessage: string;


  constructor(private userService: UserService, private errorService: ErrorInterceptor) {
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe(
      meUser => this.me = meUser,
      error => this.me = null
    )
    this.errorService.currentError.subscribe(error => {
      this.errorMessage = error;
    })
  }

  ngAfterViewInit() {
    this.footerHeight = this.footer.nativeElement.offsetHeight;

  }
}
