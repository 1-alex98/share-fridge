export class Member {
  id:string;
  displayName:string;
}

export class Expense{
  identification: string;
  name:string;
  category:string;
  shop:string;
  description: string;
  date: string;
  contentId: string;
  amount: number;
  imageName:string[];
  creator:Member;
  involved:Member[];
}
