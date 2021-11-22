import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:3000/categories");
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>("http://localhost:3000/categories/" + id);
  }

  postCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Category>("http://localhost:3000/categories", category, { headers: headers });
  }

  putCategory(id: number, category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Category>("http://localhost:3000/categories/" + id, category, { headers: headers });
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>("http://localhost:3000/categories/" + id);
  }
}