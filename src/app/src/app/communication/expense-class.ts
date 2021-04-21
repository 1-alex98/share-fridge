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
  description: string;
  date: string;
  amount: number;
  imageName:string[];
  creator:Member;
  involved:Member[];


  public static fromObject(obj): ExpenseClass {
    let userRef: ExpenseClass = new ExpenseClass();
    Object.assign(userRef, obj);
    return userRef;
  }

  amountNormalized() {
    return this.normalize(this.amount);
  }

  myGain(me: MemberClass) {
    let perPerson = this.amount / this.involved.length;
    if (this.creator.id == me.id) {
      return this.normalize(this.amount - perPerson);
    }
    return this.normalize(-1 * perPerson);
  }

  private normalize(amount: number) {
    return Math.round(amount) / 100;
  }
}
