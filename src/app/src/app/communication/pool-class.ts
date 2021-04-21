import {Expense, Member} from "./expense";
import {ExpenseClass, MemberClass} from "./expense-class";

export class PoolClass {
  id:string;
  name:string;
  description:string;
  currency:string;
  expenses:Expense[];
  commaPosition: number;
  members: Member[];
  expensesClass: ExpenseClass[];

  public static fromObject(obj): PoolClass {
    let userRef: PoolClass = new PoolClass();
    Object.assign(userRef, obj);
    userRef.expensesClass = userRef.expenses.map(value => ExpenseClass.fromObject(value));
    return userRef;
  }

  balance(me: MemberClass) {
    if (this.expenses.length <= 0) {
      return 0;
    }
    return this.expensesClass.map(value => value.myGain(me)).reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  getAllCategories() {
    return this.expensesClass.map(value => value.category)
      .filter(value => !!value)
      .filter((value, index, array) => array.indexOf(value) == index);
  }

  getAllShops() {
    return this.expensesClass.map(value => value.shop)
      .filter(value => !!value)
      .filter((value, index, array) => array.indexOf(value) == index);
  }

  getSortedExpenses(): ExpenseClass[] {
    return this.expensesClass.sort(a => new Date(a.date).getTime())
  }
}
