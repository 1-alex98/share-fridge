import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { TosComponent } from './tos/tos.component';
import { PrivacyComponent } from './privacy/privacy.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ContactComponent,
    TosComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([{
      path :"tos",
      component: TosComponent
    },
    {
     path: "privacy",
     component: PrivacyComponent
    },
    {
     path: "contact",
     component: ContactComponent
    }
    ])
  ]
})
export class InfoModule { }
