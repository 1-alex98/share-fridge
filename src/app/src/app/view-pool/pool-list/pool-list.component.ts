import {Component, OnInit} from '@angular/core';
import {PoolService} from "../../communication/pool.service";
import {Router} from "@angular/router";
import {PoolClass} from "../../communication/pool-class";
import {MemberClass} from "../../communication/expense-class";
import {UserService} from "../../communication/user.service";

@Component({
  selector: 'app-pool-list',
  templateUrl: './pool-list.component.html',
  styleUrls: ['./pool-list.component.css']
})
export class PoolListComponent implements OnInit {

  myPools: PoolClass[];
  me: MemberClass;

  constructor(private poolService: PoolService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.poolService.getMyPools().subscribe(value => {
      this.myPools = value;
      if (this.myPools.length == 1) {
        this.router.navigate(["pool", "view", this.myPools[0].id])
      }
    });

    this.userService.getMe().subscribe(value => this.me = value);
  }

}
