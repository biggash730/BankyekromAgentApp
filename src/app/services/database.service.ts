import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as PouchDB from 'pouchdb/dist/pouchdb';


export interface Lookup {
  id: number;
  name: string;
  model: string;
  eId: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public lookupDb;
  lookups: any[];
  constructor(private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.createLookupsDB();
    });
  }

  createLookupsDB() {
    PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
    this.lookupDb = new PouchDB('bankyekromLookUps.db',
      { adapter: 'cordova-sqlite' });
  }

  createLookup(obj: any, type: string) {
    obj.modifiedAt = new Date();
    obj.createdAt = new Date();
    obj.type = type;
    return this.lookupDb.post(obj);
  }

  createBulkLookups(arr: any[], type: string) {
    arr.forEach(a => {
      const recs = this.readLookups(type);
      if (recs.filter((e: { eId: any; }) => e.eId === a.eId).length <= 0) {
        this.createLookup(a, type);
      }
    });
  }

  // updateLookup(obj: any) {
  //   obj.modifiedAt = new Date();
  //   return this.lookupDb.put(obj);
  // }

  // deleteLookup(obj: any) {
  //   return this.lookupDb.delete(obj);
  // }

  readLookups(type: string) {
    function allDocs() {
      return this.lookupDb.allDocs({ include_docs: true })
        .then(docs => {
          this.lookups = docs.rows.map(row => {
            if (row.doc.type === type) {
              row.doc.Date = new Date(row.doc.Date);
              row.doc.createdAt = new Date(row.doc.createdAt);
              row.doc.modifiedAt = new Date(row.doc.modifiedAt);
              return row.doc;
            }

          });
          return this.lookups;
        });
    }

    this.lookupDb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((recs) => {
          this.lookups = recs;
        });
      });
    return allDocs();

  }
}
