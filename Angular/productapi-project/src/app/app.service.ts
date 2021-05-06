import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http : HttpClient) { }

  
  getProducts() : Observable<Product[]>{
    const apiurl = environment.apibaseurl +"/Products";
    const headers = {'content-type' : 'application/json'};

    return this.http.get<Product[]>(apiurl,{'headers' : headers}).pipe(
      tap(data => {console.log(data)}),
      catchError(error => this.handleError(error)
      )
    );
  }
  
  
  postProducts(product : Product) : Observable<Product[]>{
    const apiurl = environment.apibaseurl +"/Products";
    const headers = {'content-type' : 'application/json', 'accept' : 'application/json'};

    Object.defineProperty(product,'id',{'enumerable' : false});
    // const prod = JSON.stringify(product);
    console.log(product);
    return this.http.post<any>(apiurl,product,{'headers' : headers}).pipe(
      catchError(error => this.handleError(error))
    );
  }
  
  
  private handleError(error:any)
  {
    console.error(error);
    return throwError(error);
  }
  
  
  putProducts(product : Product) : Observable<Product[]>{
    const apiurl = environment.apibaseurl +"/Products/" + product.id;
    const headers = {'content-type' : 'application/json', 'accept' : 'application/json'};

    //Object.defineProperty(product,'id',{'enumerable' : false});
    // const prod = JSON.stringify(product);
    console.log(product);
    return this.http.put<any>(apiurl,product,{'headers' : headers}).pipe(
      catchError(error => this.handleError(error))
    );
  }
  
  
  deleteProducts(id : number) : Observable<Product[]>{
    const apiurl = environment.apibaseurl +"/Products/" + id;
    const headers = {'content-type' : 'application/json', 'accept' : 'application/json'};

    //Object.defineProperty(product,'id',{'enumerable' : false});
    // const prod = JSON.stringify(product);
    
    return this.http.delete<any>(apiurl,{'headers' : headers}).pipe(
      catchError(error => this.handleError(error))
    );
  }
  
  
  getAProduct(id : number) : Observable<Product>{
    const apiurl = environment.apibaseurl +"/Products/" + String(id);
    const headers = {'content-type' : 'application/json'};
    console.log(apiurl);

    return this.http.get<Product>(apiurl,{'headers' : headers}).pipe(
      tap(data => {console.log(data)}),
      catchError(error => this.handleError(error))
    );
  }
}
