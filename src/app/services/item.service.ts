import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item } from "../models/Item";
import { Observable } from "rxjs";
import { Todo } from '../models/Todo';
import { Category } from '../models/Category';

const headers = { "content-type": "application/json" };

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = "http://localhost:3000/items/";
  constructor(private http: HttpClient) { }
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>("http://localhost:3000/items/" + id);
  }
  getCategoryById(catogoryId: number): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:3000/categories/" + catogoryId);
  }
  // list of items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>("http://localhost:3000/items?_expand=category");
  }
  // adds the todo to the list
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url, item, { headers: headers });
  }
  // edit the todo in the list
  editItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(this.url + id, item, { headers: headers });
  }
  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(this.url + `/${item.id}`, { headers: headers });
  }

  //Todos ophalen op basis van ITEM ID
  getTodosByItemId(itemId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>("http://localhost:3000/todos?itemId=" + itemId);
  }
}
