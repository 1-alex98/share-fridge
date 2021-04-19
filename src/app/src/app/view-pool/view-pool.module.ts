import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolListComponent } from './pool-list/pool-list.component';
import {RouterModule} from "@angular/router";
import { PoolOverviewComponent } from './pool-overview/pool-overview.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import {NgxJdenticonModule} from "ngx-jdenticon";



@NgModule({
  declarations: [
    PoolListComponent,
    PoolOverviewComponent,
    ExpenseCardComponent
  ],
  imports: [
    CommonModule,
    NgxJdenticonModule,
    RouterModule.forRoot([
      {
        path:"pool/view",
        component: PoolListComponent
      },
      {
        path:"pool/view/:id",
        component: PoolOverviewComponent
      }
    ])
  ]
})
export class ViewPoolModule { }
