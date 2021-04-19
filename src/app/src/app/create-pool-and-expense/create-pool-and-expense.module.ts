import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateViewFormComponent } from './create-pool-form/create-view-form.component';
import {RouterModule} from "@angular/router";
import {QRCodeModule} from "angularx-qrcode";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { InviteComponent } from './invite/invite.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import {NgxJdenticonModule} from "ngx-jdenticon";



@NgModule({
  declarations: [
    CreateViewFormComponent,
    InviteComponent,
    CreateExpenseComponent
  ],
  imports: [
    NgbModalModule,
    QRCodeModule,
    RouterModule.forRoot([{
      path: "pool/create",
      component: CreateViewFormComponent
    },
      {
        path: "pool/invite",
        component: InviteComponent
      },
      {
        path: "pool/:id/edit",
        component: CreateViewFormComponent
      },
      {
        path: "pool/view/:id/create-expense",
        component: CreateExpenseComponent
      }]),
    ReactiveFormsModule,
    CommonModule,
    NgxJdenticonModule
  ]
})
export class CreatePoolAndExpenseModule { }
