import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pool} from "./pool";
import {map} from "rxjs/operators";
import {PoolClass} from "./pool-class";

@Injectable({
  providedIn: 'root'
})
export class PoolService {
  private BASE_URL_API = "/../api/"

  constructor(private http: HttpClient) { }

  getMyPools(): Observable<PoolClass[]> {
    return this.http.get<Pool[]>(this.BASE_URL_API + "pool").pipe(map(value => value.map(pool => PoolClass.fromObject(pool))));
  }

  getPool(id:string): Observable<PoolClass> {
    return this.http.get<Pool[]>(this.BASE_URL_API + "pool", {params: {id: id}}).pipe(map(pool => PoolClass.fromObject(pool[0])));
  }


  createPool(pool: any):Observable<string> {
    return this.http.post<Pool>(this.BASE_URL_API + "pool", pool).pipe(
      map(result => {
        return result.id;
      })
    )
  }

  generateInvite(id: string): Observable<string> {
    return this.http.get<string>(this.BASE_URL_API + "pool/" + id + "/invite", {responseType: 'text' as 'json'});
  }

  join(token: string): Observable<string> {
    return this.http.post<string>(this.BASE_URL_API + "pool/invite", token, {responseType: 'text' as 'json'});
  }

  uploadImage(value, poolId: string, expenseId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', value);

    return this.http.post<any>(this.BASE_URL_API + "pool/" + poolId + "/expense/" + expenseId + "/image", formData);
  }
}
