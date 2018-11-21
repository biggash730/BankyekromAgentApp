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
  public idTypesdb;
  public idTypes;
  public farmersdb;
  public farmers;
  public farmsdb;
  public farms;
  public seasonsdb;
  public seasons;
  public requestsdb;
  public requests;

  /*public createPouchDBsx() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.regionsdb = new PouchDB('regions.db', { adapter: 'cordova-sqlite', location: 'default' });
    this.districtsdb = new PouchDB('districts.db', { adapter: 'cordova-sqlite', location: 'default' });
    this.servicesdb = new PouchDB('services.db', { adapter: 'cordova-sqlite', location: 'default' });
    this.varietiesdb = new PouchDB('varieties.db', { adapter: 'cordova-sqlite', location: 'default' });
    this.idTypesdb = new PouchDB('idtypes.db', { adapter: 'cordova-sqlite', location: 'default' });
    this.farmersdb = new PouchDB('farmers.db', { adapter: 'cordova-sqlite', location: 'default' });
  }*/
  public createPouchDBs() {
    PouchDB.plugin(idbplugin);
    this.regionsdb = new PouchDB('regions.db', { adapter: 'idb', location: 'default' });
    this.districtsdb = new PouchDB('districts.db', { adapter: 'idb', location: 'default' });
    this.servicesdb = new PouchDB('services.db', { adapter: 'idb', location: 'default' });
    this.varietiesdb = new PouchDB('varieties.db', { adapter: 'idb', location: 'default' });
    this.idTypesdb = new PouchDB('idtypes.db', { adapter: 'idb', location: 'default' });
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
    this.idTypesdb.destroy();
    this.farmersdb.destroy();
    this.farmsdb.destroy();
    this.seasonsdb.destroy();
    this.requestsdb.destroy();

  }


  public getDistricts() {
    var self = this
    PouchDB.plugin(idbplugin);
    self.districtsdb = new PouchDB('districts.db', { adapter: 'idb', location: 'default' });
    function allDocs() {
      return self.districtsdb.allDocs({ include_docs: true })
        .then(docs => {
          console.log(docs)
          self.districts = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return self.districts;
        });
    }

    self.districtsdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          console.log(res)
          self.districts = res;
        });
      });
    return allDocs();
  }

  public saveFarmer(obj) {
    obj.modifiedAt = new Date();
    if (obj.id) return this.farmersdb.put(obj);
    else return this.farmersdb.post(obj);
  }

  deleteFarmer(obj) {
    obj.deleted = true;
    return this.farmersdb.delete(obj);
  }

  readFarmers() {
    function allDocs() {
      return this.farmersdb.allDocs({ include_docs: true })
        .then(docs => {
          this.farmers = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            if (!row.doc.deleted) return row.doc;
          });
          return this.farmers;
        });
    }

    this.farmersdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          console.log(res)
          this.farmers = res;
        });
      });
    return allDocs();

  }


  public addBulkRecords(obj, type) {
    var db;
    if (type == "regions") db = this.regionsdb;
    if (type == "districts") db = this.districtsdb;
    if (type == "services") db = this.servicesdb;
    if (type == "varieties") db = this.varietiesdb;
    if (type == "idTypes") db = this.idTypesdb;
    if (type == "farmers") db = this.farmersdb;
    var res = db.bulkDocs(obj);
    return res;
  }
  public saveRecord(obj, type) {    
    var db;
    obj.modifiedAt = new Date();
    if (type == "farmers") db = this.farmersdb;
    if (type == "farms") db = this.farmersdb;
    if (type == "seasons") db = this.farmersdb;
    if (type == "requests") db = this.farmersdb;
    if (obj.id) return db.put(obj);
    else return db.post(obj);
  }
  deleteRecord(obj, type) {
    var db;
    obj.deleted = true;
    if (type == "farmers") db = this.farmersdb;
    if (type == "farms") db = this.farmersdb;
    if (type == "seasons") db = this.farmersdb;
    if (type == "requests") db = this.farmersdb;
    
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
    else if (type == "idTypes"){
      db = new PouchDB('idTypes.db', { adapter: 'idb', location: 'default' });
      list = self.idTypes;
    }
    else if (type == "farmers"){
      db = new PouchDB('farmers.db', { adapter: 'idb', location: 'default' });
      list = self.farmers;
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
