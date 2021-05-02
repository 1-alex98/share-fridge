import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Expense} from "../../communication/expense";
import {ExpenseClass, MemberClass} from "../../communication/expense-class";
import {PoolClass} from "../../communication/pool-class";
import {PoolService} from "../../communication/pool.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ExpenseService} from "../../communication/expense.service";
import imageCompression from "browser-image-compression";
import {UserService} from "../../communication/user.service";

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
  originalExpense: ExpenseClass;
  private uploadForm: any;
  owner = true;

  constructor(private poolService: PoolService, private route: ActivatedRoute,
              private calendar: NgbCalendar, private expenseService: ExpenseService,
              private router: Router, private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  get shop() {
    return this.expenseForm.get('shop');
  }

  get category() {
    return this.expenseForm.get('category');
  }

  get image() {
    return this.uploadForm.get('image');
  }

  ngOnInit(): void {
    this.route.params.subscribe(pathParameters => {
      let poolId = pathParameters["id"];
      this.poolService.getPool(poolId).subscribe(pool => {
        this.pool = pool;
        this.members = pool.members.map(value1 => MemberClass.fromObject(value1));
        this.selectedMembers = Object.assign([], this.members);
        let pathParameter = pathParameters["expenseId"];
        if (pathParameter) {
          this.loadOriginalExpense(pathParameter);
        }else {
          this.date = this.calendar.getToday();
        }
        this.knownCategoriesAndShops();
      });
    })

    this.uploadForm = this.formBuilder.group({
      image: ['']
    });

    this.defaultCategoriesAndShops();
  }

  private loadOriginalExpense(pathParameter: string) {
    this.originalExpense = this.pool.expensesClass.find(expense=> expense.identification = pathParameter);
    if(!this.originalExpense){
      alert("No such Expense!");
      return;
    }
    this.expenseForm.patchValue(this.originalExpense);
    this.amount.setValue(this.originalExpense.amountNormalized());
    this.setDateFromExpense();
    this.selectedMembers = this.originalExpense.involved.map(member => MemberClass.fromObject(member));
    this.isCollapsed = false;
    this.userService.getMe().subscribe(me => {
      this.owner = this.originalExpense.creator.id == me.id;
    })
  }

  private setDateFromExpense() {
    let split:string[] = this.originalExpense.date.split("-", 3);
    this.date.year = Number(split[0]);
    this.date.month = Number(split[1]);
    this.date.day = Number(split[2]);
  }

  onSubmit() {
    let dataForm = this.expenseForm.getRawValue();
    let expense = new Expense();
    Object.assign(expense, dataForm);
    expense.involved = this.selectedMembers;
    expense.amount = Math.round(expense.amount * Math.pow(10, this.pool.commaPosition));
    expense.date = this.date.year + "-" + this.date.month + "-" + this.date.day;

    this.expenseService.createExpense(expense, this.pool.id).subscribe(expenseId => {
      if (this.image.value) {
        this.uploadImage(expenseId);
      } else {
        this.backToPool();
      }
    })
  }

  private uploadImage(expenseId: string) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    imageCompression(this.image.value, options).then(compressedImage => {
      this.poolService.uploadImage(compressedImage, this.pool.id, expenseId).subscribe(() => {
        this.backToPool();
      }, error => {
        console.error(error);
        this.backToPool();
      })
    }).catch(reason => console.error(reason));
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image.setValue(file);
    }
  }

  private backToPool() {
    this.router.navigate(["/pool", "view", this.pool.id]);
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
