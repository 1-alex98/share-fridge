import { Component, OnInit } from '@angular/core';
import {Pool} from "../../communication/pool";
import {PoolService} from "../../communication/pool.service";
import {Route, Router} from "@angular/router";
import {PoolClass} from "../../communication/pool-class";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-pool-list',
  templateUrl: './pool-list.component.html',
  styleUrls: ['./pool-list.component.css']
})
export class PoolListComponent implements OnInit {

  myPools: PoolClass[];

  constructor(private poolService:PoolService, private router:Router) { }

  ngOnInit(): void {
    this.poolService.getMyPools().subscribe(value => {
      this.myPools = value;
      if(this.myPools.length == 1){
        this.router.navigate(["pool", "view", this.myPools[0].id])
      }
    })
  }

}
