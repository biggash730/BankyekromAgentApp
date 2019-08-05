import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  apiUrl = 'https://bankyekrom.azurewebsites.net/api/';
  // apiUrl = 'http://localhost:1501/api/';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'agents/login', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }
  logout(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'agents/logout')
      .pipe(
        tap(_ => this.log('logout')),
        catchError(this.handleError('logout', []))
      );
  }

  getVarieties(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'public/getvarieties')
      .pipe(
        tap(_ => this.log('fetched varieties')),
        catchError(this.handleError('getVarieties', []))
      );
  }

  getServices(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'public/getservices')
      .pipe(
        tap(_ => this.log('fetched services')),
        catchError(this.handleError('getServices', []))
      );
  }

  getRegions(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'public/getregions')
      .pipe(
        tap(_ => this.log('fetched regions')),
        catchError(this.handleError('getRegions', []))
      );
  }

  getDistricts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'public/getdistricts')
      .pipe(
        tap(_ => this.log('fetched districts')),
        catchError(this.handleError('getDistricts', []))
      );
  }

  getFarmers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'farmers/agentget')
      .pipe(
        tap(_ => this.log('fetched farmers')),
        catchError(this.handleError('getFarmers', []))
      );
  }

  getFarms(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'farms/agentget')
      .pipe(
        tap(_ => this.log('fetched farms')),
        catchError(this.handleError('getFarms', []))
      );
  }

  getSeasons(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'seasons/agentget')
      .pipe(
        tap(_ => this.log('fetched seasons')),
        catchError(this.handleError('getSeasons', []))
      );
  }

  pushData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'agents/saveofflinedata', data)
      .pipe(
        tap(_ => this.log('push data')),
        catchError(this.handleError('push data', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // console.log(message);
  }
}
