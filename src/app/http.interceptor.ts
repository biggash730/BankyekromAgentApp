//import { Events } from 'ionic-angular';
//import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs';
import { Storage } from '@ionic/storage';
import {Http, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

export class HttpInterceptor extends Http {
  response : Response
  constructor(connectionBackend: ConnectionBackend, requestOptions: RequestOptions, public storage: Storage) {
    super(connectionBackend, requestOptions);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.get(url, options)
    });
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
      //console.log(0)
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
        //console.log(options)
      return super.post(url, body, options)
    })
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.put(url, body, options)
    })
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.delete(url, options)
    });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs) {
    return this.storage.get('TOKEN').then((token) => {
        //console.log(1)
      if (options == null) {
        options = new RequestOptions();
      }

      if (options.headers == null) {
        options.headers = new Headers();
      }

      if (token !== null) {
          //console.log(2)
        options.headers.append('Authorization', 'Bearer ' + JSON.parse(token));
      }
      options.headers.append('Content-Type', 'application/json');
      //console.log(options)
      return options;
    });
  }
}