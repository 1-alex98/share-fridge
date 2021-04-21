import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Expense} from "../../communication/expense";
import {MemberClass} from "../../communication/expense-class";
import {PoolClass} from "../../communication/pool-class";
import {PoolService} from "../../communication/pool.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ExpenseService} from "../../communication/expense.service";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  expenseForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(4), Validators.required]),
    description: new FormControl(''),
    amount: new FormControl('', [Validators.required]),
    shop: new FormControl(''),
    category: new FormControl('groceries', [Validators.required])
  });
  members: MemberClass[];
  selectedMembers: MemberClass[];
  pool: PoolClass;
  date: NgbDateStruct;
  isCollapsed = true;
  knownCategories: string[];
  knownShops: string[];


  constructor(private poolService: PoolService, private route: ActivatedRoute,
              private calendar: NgbCalendar, private expenseService: ExpenseService,
              private router: Router) {
  }

  get shop() {
    return this.expenseForm.get('shop');
  }

  get category() {
    return this.expenseForm.get('category');
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      let poolId = value["id"];
      this.poolService.getPool(poolId).subscribe(pool => {
        this.pool = pool;
        this.members = pool.members.map(value1 => MemberClass.fromObject(value1));
        this.selectedMembers = Object.assign([], this.members);
        this.knownCategoriesAndShops();
      });
    })

    this.date = this.calendar.getToday();

    this.defaultCategoriesAndShops();
  }

  onSubmit() {
    let dataForm = this.expenseForm.getRawValue();
    let expense = new Expense();
    Object.assign(expense, dataForm);
    expense.involved = this.selectedMembers;
    expense.amount = Math.round(expense.amount * Math.pow(10, this.pool.commaPosition));
    expense.date = this.date.year + "-" + this.date.month + "-" + this.date.day;
    this.expenseService.createExpense(expense, this.pool.id).subscribe(value => {
      this.router.navigate(["/pool", "view", this.pool.id]);
    })
  }

  get name() {
    return this.expenseForm.get('name');
  }

  get amount() {
    return this.expenseForm.get('amount');
  }

  selectCategory(cat: string) {
    this.category.setValue(cat);
  }

  selectShop(shop: string) {

    this.shop.setValue(shop);
  }

  toggle(member: MemberClass, item: HTMLDivElement) {
    if (!item.classList.contains("selected-member")) {
      item.classList.add("selected-member");
      this.selectedMembers.push(member);
    } else {
      item.classList.remove("selected-member");
      this.selectedMembers = this.selectedMembers.filter(obj => obj.id !== member.id);
    }
  }

  private defaultCategoriesAndShops() {
    this.knownCategories = ["groceries", "money transfer", "restaurant"];
    this.knownShops = ["Aldi", "Edeka", "Rewe"];
  }

  private knownCategoriesAndShops() {
    this.knownCategories = this.knownCategories.concat(this.pool.getAllCategories());
    this.knownShops = this.knownShops.concat(this.pool.getAllShops());
  }
}
