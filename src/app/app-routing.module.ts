import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosComponent } from './components/todos/todos.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo/:id', component: TodosComponent },
  { path: 'todo/form/:id', component: AddTodoComponent },
  { path: 'todolist', component: TodoListComponent },
  { path: 'item/form', component: ListFormComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/form', component: CategoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
