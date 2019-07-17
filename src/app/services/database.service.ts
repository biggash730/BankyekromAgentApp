import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  lookups = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'bankyekrom.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
        });
    });
  }


  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getLookups(): Observable<Lookup[]> {
    return this.lookups.asObservable();
  }

  loadLookups() {
    return this.database.executeSql('SELECT * FROM lookups', []).then(data => {
      const lookups: Lookup[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          lookups.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            model: data.rows.item(i).model,
            eId: data.rows.item(i).eId,
            createdAt: data.rows.item(i).createdAt,
            updatedAt: data.rows.item(i).updatedAt
          });
        }
      }
      this.lookups.next(lookups);
    });
  }

  addLookup(name, model, eid) {
    const now = new Date();
    const data = [name, model, eid, now, now];
    return this.database.executeSql('INSERT INTO lookups (name, model, eid, createdAt, updatedAt)' +
      'VALUES (?, ?, ?, ?, ?)', data).then(res => {
        this.loadLookups();
      });
  }

  getLookup(id: any): Promise<any> {
    return this.database.executeSql('SELECT * FROM lookups WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        eId: data.rows.item(0).eId,
        createdAt: data.rows.item(0).createdAt,
        updatedAt: data.rows.item(0).updatedAt
      };
    });
  }

  getLookupByModel(model: any): Promise<any> {
    return this.database.executeSql('SELECT * FROM lookups WHERE model like ?', [model]).then(data => {
      const lookups: Lookup[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          lookups.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            model: data.rows.item(i).model,
            eId: data.rows.item(i).eId,
            createdAt: data.rows.item(i).createdAt,
            updatedAt: data.rows.item(i).updatedAt
          });
        }
      }
      this.lookups.next(lookups);
    });
  }

  // deleteDeveloper(id) {
  //   return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
  //     this.loadDevelopers();
  //     this.loadProducts();
  //   });
  // }

  // updateDeveloper(dev: Dev) {
  //   const data = [dev.name, JSON.stringify(dev.skills), dev.img];
  //   return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(res => {
  //     this.loadDevelopers();
  //   });
  // }

  // loadProducts() {
  //   const query = 'SELECT product.name, product.id, developer.name AS creator' +
  //     'FROM product JOIN developer ON developer.id = product.creatorId';
  //   return this.database.executeSql(query, []).then(data => {
  //     const products = [];
  //     if (data.rows.length > 0) {
  //       for (let i = 0; i < data.rows.length; i++) {
  //         products.push({
  //           name: data.rows.item(i).name,
  //           id: data.rows.item(i).id,
  //           creator: data.rows.item(i).creator,
  //         });
  //       }
  //     }
  //     this.products.next(products);
  //   });
  // }

  // addProduct(name, creator) {
  //   const data = [name, creator];
  //   return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(res => {
  //     this.loadProducts();
  //   });
  // }
}
