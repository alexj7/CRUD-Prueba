import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/internal/operators/catchError";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url = 'https://reqres.in/api/users'

  constructor(public http: HttpClient) { }

  public getUser(page?): Observable<any> {
  return this.http.get(this.url + `?page=${page}`).pipe((response => response),
      catchError(this.handleError)
    );
  }

  public createUser(body): Observable<any> {
    return this.http.post(this.url, {body}).pipe((response => response),
      catchError(this.handleError)
    );
  }

  public delUser(id): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe((response => response),
      catchError(this.handleError)
    );
  }






  private handleError(error: any): Observable<any> {
    let err = error;
      return throwError(error);
  }


}
