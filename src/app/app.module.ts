import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodosComponent } from "./components/todos/todos.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, TodosComponent, TodoItemComponent, AddTodoComponent, HomeComponent, MenuComponent, TodoListComponent, ListFormComponent, CategoryListComponent, CategoryFormComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, DragDropModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
