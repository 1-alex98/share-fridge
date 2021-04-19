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

  constructor(private http: HttpClient) { }

  getMyPools(): Observable<PoolClass[]> {
    return this.http.get<Pool[]>("/../api/pool").pipe(map(value => value.map(pool => PoolClass.fromObject(pool))));
  }

  getPool(id:string): Observable<PoolClass> {
    return this.http.get<Pool[]>("/../api/pool", { params:{id: id}}).pipe(map(pool => PoolClass.fromObject(pool[0])));
  }


  createPool(pool: any):Observable<string> {
    return this.http.post<Pool>("/../api/pool", pool).pipe(
      map( result=>{
        return result.id;
      })
    )
  }

  generateInvite(id:string): Observable<string> {
    return this.http.get<string>("/../api/pool/"+id+"/invite", { responseType: 'text' as 'json' });
  }

  join(token:string): Observable<string> {
    return this.http.post<string>("/../api/pool/invite", token, { responseType: 'text' as 'json'});
  }

}
