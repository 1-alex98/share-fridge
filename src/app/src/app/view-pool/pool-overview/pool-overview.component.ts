import { Component, OnInit } from '@angular/core';
import {Pool} from "../../communication/pool";
import {ActivatedRoute} from "@angular/router";
import {PoolService} from "../../communication/pool.service";
import {PoolClass} from "../../communication/pool-class";
import {Expense} from "../../communication/expense";
import {ExpenseClass} from "../../communication/expense-class";

@Component({
  selector: 'app-pool-overview',
  templateUrl: './pool-overview.component.html',
  styleUrls: ['./pool-overview.component.css']
})
export class PoolOverviewComponent implements OnInit {
  pool: PoolClass;

  constructor(private route:ActivatedRoute, private poolService:PoolService) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      let poolId = value["id"];
      this.poolService.getMyPools().subscribe(pools => {
        this.pool = pools.find(currentPool => currentPool.id = poolId)
      })
    })
  }

  expenseToClass(expense: Expense) :ExpenseClass{
    return ExpenseClass.fromObject(expense);
  }
}
