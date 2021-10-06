import { Component, OnInit } from '@angular/core';
import { Todo } from "src/app/models/Todo";
import { TodoService } from "src/app/services/todo.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    console.log(id)
    this.todoService.getTodosByItemId(id).subscribe(todos => (this.todos = todos));
  }
  add() {
    //Navigate to form in add mode
    this.router.navigate(['todo/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['todo/form'], {state: {id: id, mode: 'edit'}});
  }
  // deletes the selected todo from ui and db
  deleteTodo(todo:Todo)
  {
    this.todos = this.todos.filter(t=> t.id != todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

}
