import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';


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

  public createPouchDBs() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.regionsdb = new PouchDB('regions.db',{ adapter: 'cordova-sqlite' });
    this.districtsdb = new PouchDB('districts.db',{ adapter: 'cordova-sqlite' });
    this.servicesdb = new PouchDB('services.db',{ adapter: 'cordova-sqlite' });
    this.varietiesdb = new PouchDB('varieties.db',{ adapter: 'cordova-sqlite' });
    this.idTypesdb = new PouchDB('idtypes.db',{ adapter: 'cordova-sqlite' });
    this.farmersdb = new PouchDB('farmers.db',{ adapter: 'cordova-sqlite' });
  }
  public destroyPouchDBs() {
    this.regionsdb.destroy();
    this.districtsdb.destroy();
    this.servicesdb.destroy();
    this.varietiesdb.destroy();
    this.idTypesdb.destroy();
    this.farmersdb.destroy();
  }

  
  public addDistricts(obj) {
    return this.districtsdb.bulkDocs(obj);
  }
  public getDistricts() {
    function allDocs() {
      return this.districtsdb.allDocs({ include_docs: true })
        .then(docs => {
          this.districts = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.districts;
        });
    }

    this.districtsdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          this.districts = res;
        });
      });
    return allDocs();

  }

  public addServices(obj) {
    return this.servicesdb.bulkDocs(obj);
  }
  public getServices() {
    function allDocs() {
      return this.servicesdb.allDocs({ include_docs: true })
        .then(docs => {
          this.services = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.services;
        });
    }
    this.servicesdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          this.services = res;
        });
      });
    return allDocs();
  }
  public addVarieties(obj) {
    return this.varietiesdb.bulkDocs(obj);
  }
  public getVarieties() {
    function allDocs() {
      return this.varietiesdb.allDocs({ include_docs: true })
        .then(docs => {
          this.varieties = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.varieties;
        });
    }
    this.varietiesdb.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((res) => {
          this.varieties = res;
        });
      });
    return allDocs();
  }


  public addFarmers(obj) {
    obj.forEach(e => {
      e.modifiedAt = new Date();
    });
    return this.farmersdb.bulkDocs(obj);
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


  public addBulkRecords(obj, type){
    var db;
    if(type == "regions") db = this.regionsdb;
    if(type == "districts") db = this.districtsdb;
    if(type == "services") db = this.servicesdb;
    if(type == "varieties") db = this.varietiesdb;
    if(type == "idTypes") db = this.idTypesdb;
    if(type == "farmers") db = this.farmersdb;  

    return db.bulkDocs(obj);
  }

}
