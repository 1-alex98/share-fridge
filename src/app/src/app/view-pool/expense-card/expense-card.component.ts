import {Component, Input, OnInit} from '@angular/core';
import {ExpenseClass, MemberClass} from "../../communication/expense-class";

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {
  @Input("expense")
  expense: ExpenseClass;
  @Input("me") me: MemberClass;

  constructor() {
  }

  ngOnInit(): void {
  }

  cssClass(number: number): string {
    return number > 0 ? "gain" : number == 0 ? "" : "loss;"
  }
}
