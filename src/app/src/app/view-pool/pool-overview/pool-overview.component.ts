import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PoolService} from "../../communication/pool.service";
import {PoolClass} from "../../communication/pool-class";
import {UserService} from "../../communication/user.service";
import {MemberClass} from "../../communication/expense-class";

@Component({
  selector: 'app-pool-overview',
  templateUrl: './pool-overview.component.html',
  styleUrls: ['./pool-overview.component.css']
})
export class PoolOverviewComponent implements OnInit {
  pool: PoolClass;
  me: MemberClass;

  constructor(private route: ActivatedRoute, private poolService: PoolService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe(value => this.me = value);

    this.route.params.subscribe(value => {
      let poolId = value["id"];
      this.poolService.getMyPools().subscribe(pools => {
        this.pool = pools.find(currentPool => currentPool.id = poolId)
      })
    })
  }

  cssClass(number: number): string {
    return number > 0 ? "gain" : number == 0 ? "" : "loss";
  }
}
