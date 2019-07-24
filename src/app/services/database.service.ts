import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

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
  public pdb;
  records: any[];
  constructor(private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.createPouchDB();
    });
  }

  createPouchDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB('bankyekrom.db',
      { adapter: 'cordova-sqlite' });
  }

  create(obj: any, type: string) {
    obj.modifiedAt = new Date();
    obj.createdAt = new Date();
    obj.type = type;
    return this.pdb.post(obj);
  }

  createBulk(arr: any[], type: string) {
    arr.forEach(a => {
      const recs = this.read(type);
      if (recs.filter((e: { eId: any; }) => e.eId === a.eId).length <= 0) {
        this.create(a, type);
      }
    });
  }

  update(obj: any) {
    obj.modifiedAt = new Date();
    return this.pdb.put(obj);
  }

  delete(obj: any) {
    return this.pdb.delete(obj);
  }

  read(type: string) {
    function allDocs() {
      return this.pdb.allDocs({ include_docs: true })
        .then(docs => {
          this.records = docs.rows.map(row => {
            if (row.doc.type === type) {
              row.doc.Date = new Date(row.doc.Date);
              row.doc.createdAt = new Date(row.doc.createdAt);
              row.doc.modifiedAt = new Date(row.doc.modifiedAt);
              return row.doc;
            }

          });
          return this.records;
        });
    }

    this.pdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((recs) => {
          this.records = recs;
        });
      });
    return allDocs();

  }
}
