import {Expense, Member} from "./expense";

export class Pool {
  id:string;
  name:string;
  description:string;
  currency:string;
  expenses:Expense[];
  commaPosition:number;
  members:Member[];
}
