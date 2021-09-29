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

  // list of items
  getTodos(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}`);
  }
  // adds the todo to the list
  addTodo(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url, item, { headers: headers });
  }
  // edit the todo in the list
  editTodo(item: Item): Observable<Item> {
    return this.http.put<Item>(this.url + `/${item.id}`, item, { headers: headers });
  }

}
