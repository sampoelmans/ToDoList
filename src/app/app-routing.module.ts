import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosComponent } from './components/todos/todos.component';
import { HomeComponent } from './home/home.component';
import { TodosmanageComponent } from './todosmanage/todosmanage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todolist', component: TodosComponent },
  { path: 'addtodo', component: TodosmanageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
