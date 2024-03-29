import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoggedInComponent} from './logged-in/logged-in.component';
import {StatusNotFoundComponent} from './status-not-found/status-not-found.component';
import {ViewPoolModule} from "./view-pool/view-pool.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CreatePoolAndExpenseModule} from "./create-pool-and-expense/create-pool-and-expense.module";
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InfoModule} from "./info/info.module";
import {FormsModule} from "@angular/forms";
import {ErrorInterceptor} from "./communication/error.interceptor";
import {ErrorService} from "./communication/error.service";
import {StatsModule} from "./stats/stats.module";

@NgModule({
  declarations: [
    AppComponent,
    LoggedInComponent,
    StatusNotFoundComponent
  ],
  imports: [
    InfoModule,
    NgbAlertModule,
    BrowserModule,
    CreatePoolAndExpenseModule,
    ViewPoolModule,
    StatsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
    deps: [ErrorService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
