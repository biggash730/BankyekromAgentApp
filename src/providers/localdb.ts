import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';


@Injectable()
export class LocaldbProvider {
  public farmersdb;
  public farmers;

  createPouchDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.farmersdb = new PouchDB('farmers.db',
      { adapter: 'cordova-sqlite' });
  }

  public createFarmer(obj) {
    obj.modifiedAt = new Date();
    return this.farmersdb.post(obj);
  }

  public updateFarmer(obj) {
    obj.modifiedAt = new Date();
    return this.farmersdb.put(obj);
  }

  deleteFarmer(obj) {
    return this.farmersdb.delete(obj);
  }

  readFarmer() {
    function allDocs() {
      return this.pdb.allDocs({ include_docs: true })
        .then(docs => {
          this.farmers = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.farmers;
        });
    }

    this.farmersdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          this.farmers = res;
        });
      });
    return allDocs();

  }

}
