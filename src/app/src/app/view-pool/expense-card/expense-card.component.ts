import {Component, Input, OnInit} from '@angular/core';
import {ExpenseClass} from "../../communication/expense-class";

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {
  @Input("expense")
  expense: ExpenseClass;

  constructor() { }

  ngOnInit(): void {
  }

}
