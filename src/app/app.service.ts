import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class AppService{

    constructor(private httpClient : HttpClient){}

    getData(){
        return this.httpClient.get('http://localhost:5000/get/data').pipe(map((res:Response)=>res),catchError(this.handleError));
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return observableThrowError(errMsg);
      }
}