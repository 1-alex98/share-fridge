import {Member} from "./expense";

export class MemberClass {
  id:string;
  displayName:string;

  public static fromObject(obj):MemberClass {
    let userRef: MemberClass = new MemberClass();
    Object.assign(userRef, obj);
    return userRef;
  }
}

export class ExpenseClass{
  identification: string;
  name:string;
  category:string;
  shop:string;
  description:string;
  amount:number;
  imageName:string[];
  creator:Member;
  involved:Member[];



  public static fromObject(obj):ExpenseClass {
    let userRef: ExpenseClass = new ExpenseClass();
    Object.assign(userRef, obj);
    return userRef;
  }

  amountNormalized() {
    return this.amount / 100;
  }

  myGain() {
    return this.amount / 200;
  }
}
