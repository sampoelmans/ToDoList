import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item } from "../models/Item";
import { Observable } from "rxjs";

const headers = { "content-type": "application/json" };

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = "http://localhost:3000/items";
  constructor(private http: HttpClient) { }
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>("http://localhost:3000/items" + id);
  }
  // list of items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}`);
  }
  // adds the todo to the list
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url, item, { headers: headers });
  }
  // edit the todo in the list
  editItem(id:number,item: Item): Observable<Item> {
    return this.http.put<Item>(this.url + id, item, { headers: headers });
  }
  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(this.url + `/${item.id}`, { headers: headers });
  }
}
