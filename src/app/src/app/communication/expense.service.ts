import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Expense} from "./expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {
  }

  createExpense(expense: Expense, poolId: string): Observable<string> {
    return this.http.post<string>("/../api/pool/" + poolId + "/expense", expense, {responseType: 'text' as 'json'})
  }
}
