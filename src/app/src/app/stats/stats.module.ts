import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainStatsComponent } from './main-stats/main-stats.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MainStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([{
      path: "pool/:id/stats",
      component: MainStatsComponent
    }])
  ]
})
export class StatsModule { }
