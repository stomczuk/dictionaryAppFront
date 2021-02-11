import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RestApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }


  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `message was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getMethod(endpoint: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('test', 'test');
    return this.http.get<any>(this.baseUrl + endpoint, {'headers': headers}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postMethod(endpoint: string, object: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post(this.baseUrl + endpoint, object,{'headers': headers})
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
