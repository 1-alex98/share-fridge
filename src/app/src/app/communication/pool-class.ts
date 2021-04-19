import {Expense, Member} from "./expense";

export class PoolClass {
  id:string;
  name:string;
  description:string;
  currency:string;
  expenses:Expense[];
  commaPosition:number;
  members:Member[];
  balance(){
    return 0;
  }

  public static fromObject(obj):PoolClass {
    let userRef: PoolClass = new PoolClass();
    Object.assign(userRef, obj);
    return userRef;
  }
}
