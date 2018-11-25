import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import idbplugin from 'pouchdb-adapter-idb';


@Injectable()
export class LocaldbProvider {

  public regionsdb;
  public regions;
  public districtsdb;
  public districts;
  public servicesdb;
  public services;
  public varietiesdb;
  public varieties;
  public idtypesdb;
  public idtypes;
  public farmersdb;
  public farmers;
  public farmsdb;
  public farms;
  public seasonsdb;
  public seasons;
  public requestsdb;
  public requests;

  public createPouchDBs() {
    PouchDB.plugin(idbplugin);
    this.regionsdb = new PouchDB('regions.db', { adapter: 'idb', location: 'default' });
    this.districtsdb = new PouchDB('districts.db', { adapter: 'idb', location: 'default' });
    this.servicesdb = new PouchDB('services.db', { adapter: 'idb', location: 'default' });
    this.varietiesdb = new PouchDB('varieties.db', { adapter: 'idb', location: 'default' });
    this.idtypesdb = new PouchDB('idtypes.db', { adapter: 'idb', location: 'default' });
    this.farmersdb = new PouchDB('farmers.db', { adapter: 'idb', location: 'default' });
    this.farmsdb = new PouchDB('farms.db', { adapter: 'idb', location: 'default' });
    this.seasonsdb = new PouchDB('seasons.db', { adapter: 'idb', location: 'default' });
    this.requestsdb = new PouchDB('requests.db', { adapter: 'idb', location: 'default' });
  }
  public destroyPouchDBs() {
    this.regionsdb.destroy();
    this.districtsdb.destroy();
    this.servicesdb.destroy();
    this.varietiesdb.destroy();
    this.idtypesdb.destroy();
    this.farmersdb.destroy();
    this.farmsdb.destroy();
    this.seasonsdb.destroy();
    this.requestsdb.destroy();

  }

public addBulkRecords(obj, type) {
    var db;
    if (type == "regions") db = this.regionsdb;
    if (type == "districts") db = this.districtsdb;
    if (type == "services") db = this.servicesdb;
    if (type == "varieties") db = this.varietiesdb;
    if (type == "idtypes") db = this.idtypesdb;
    if (type == "farmers") db = this.farmersdb;
    if (type == "farms") db = this.farmsdb;
    if (type == "seasons") db = this.seasonsdb;
    if (type == "requests") db = this.requestsdb;
    var res = db.bulkDocs(obj);
    return res;
  }
  public saveRecord(obj, type) {   
    console.log(obj) 
    var db;
    obj.modifiedAt = new Date();
    if (type == "farmers"){
      db = new PouchDB('farmers.db', { adapter: 'idb', location: 'default' });
    }
    else if (type == "farms"){
      db = new PouchDB('farms.db', { adapter: 'idb', location: 'default' });
    }
    else if (type == "seasons"){
      db = new PouchDB('seasons.db', { adapter: 'idb', location: 'default' });
    }
    else if (type == "requests"){
      db = new PouchDB('requests.db', { adapter: 'idb', location: 'default' });
    }
    if (obj.id) return db.put(obj);
    else return db.post(obj);
  }
  deleteRecord(obj, type) {
    var db;
    obj.deleted = true;
    if (type == "farmers"){
      db = new PouchDB('farmers.db', { adapter: 'idb', location: 'default' });
    }
    else if (type == "farms"){
      db = new PouchDB('farms.db', { adapter: 'idb', location: 'default' });
    }
    else if (type == "seasons"){
      db = new PouchDB('seasons.db', { adapter: 'idb', location: 'default' });
    }
    else if (type == "requests"){
      db = new PouchDB('requests.db', { adapter: 'idb', location: 'default' });
    }
    
    return db.delete(obj);
  }

  public getRecords(type) {
    var self = this
    PouchDB.plugin(idbplugin);
    var db;
    var list;
    if (type == "regions") {
      db = new PouchDB('regions.db', { adapter: 'idb', location: 'default' });
      list = self.districts;
    }
    else if (type == "districts"){
      db = new PouchDB('districts.db', { adapter: 'idb', location: 'default' });
      list = self.districts;
    }
    else if (type == "services"){
      db = new PouchDB('services.db', { adapter: 'idb', location: 'default' });
      list = self.services;
    }
    else if (type == "varieties"){
      db = new PouchDB('varieties.db', { adapter: 'idb', location: 'default' });
      list = self.varieties;
    }
    else if (type == "idtypes"){
      db = new PouchDB('idtypes.db', { adapter: 'idb', location: 'default' });
      list = self.idtypes;
    }
    else if (type == "farmers"){
      db = new PouchDB('farmers.db', { adapter: 'idb', location: 'default' });
      list = self.farmers;
    }
    else if (type == "farms"){
      db = new PouchDB('farms.db', { adapter: 'idb', location: 'default' });
      list = self.farms;
    }
    else if (type == "seasons"){
      db = new PouchDB('seasons.db', { adapter: 'idb', location: 'default' });
      list = self.seasons;
    }
    else if (type == "requests"){
      db = new PouchDB('requests.db', { adapter: 'idb', location: 'default' });
      list = self.requests;
    }
    
    function allDocs() {
      return db.allDocs({ include_docs: true })
        .then(docs => {
          list = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return list;
        });
    }

    db.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          list = res;
        });
      });
    return allDocs();
  }

}
