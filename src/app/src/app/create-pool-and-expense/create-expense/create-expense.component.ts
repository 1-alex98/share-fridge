import {Component, enableProdMode, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Expense, Member} from "../../communication/expense";
import {MemberClass} from "../../communication/expense-class";
import {PoolClass} from "../../communication/pool-class";
import {PoolService} from "../../communication/pool.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  expenseForm= new FormGroup({
    name : new FormControl('',[Validators.minLength(4), Validators.required]),
    description : new FormControl(''),
    amount : new FormControl('',[Validators.required]),
    shop : new FormControl(),
    category : new FormControl()
  });
  members: MemberClass[];
  selectedMembers: MemberClass[];
  pool: PoolClass;


  constructor(private poolService:PoolService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      let poolId = value["id"];
      this.poolService.getPool(poolId).subscribe(pool => {
        this.pool = pool;
        this.members = pool.members.map(value1 => MemberClass.fromObject(value1));
        this.selectedMembers =  Object.assign([], this.members);
      });
    })
  }

  onSubmit() {
    let dataForm = this.expenseForm.getRawValue();
    let expense = new Expense();
    Object.assign(expense, dataForm);
    expense.involved = this.selectedMembers;
    console.log(expense);
  }

  get name() { return this.expenseForm.get('name'); }
  get amount() { return this.expenseForm.get('amount'); }

  toggle(member: MemberClass, item: HTMLDivElement) {
    if(!item.classList.contains("selected-member")){
      item.classList.add("selected-member");
      this.selectedMembers.push(member);
    }else {
      item.classList.remove("selected-member");
      this.selectedMembers = this.selectedMembers.filter(obj => obj.id !== member.id);
    }
  }
}
