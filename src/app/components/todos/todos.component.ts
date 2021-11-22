import { Component, Input, OnInit } from '@angular/core';
import { Todo } from "src/app/models/Todo";
import { TodoService } from "src/app/services/todo.service";
import { ItemService } from "src/app/services/item.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  @Input() todo: Todo;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    //add to localstorage
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  constructor(private todoService: TodoService, private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    console.log(id)
    this.todoService.getTodosByItemId(id).subscribe(todos => (this.todos = todos));
    this.div2 = false;
  }
  add() {
    //Navigate to form in add mode
    let id = this.route.snapshot.params.id;
    this.router.navigate(['todo/form/' + id], { state: { mode: 'add' } });
  }
  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['todo/form/' + id], { state: { id: id, mode: 'edit' } });
  }
  // deletes the selected todo from ui and db
  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id != todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }
  completeTodo(todo: Todo) {

    todo.completed = !todo.completed;
    this.todoService.completeTodo(todo).subscribe();
  }
  div1: boolean = true;
  div2: boolean = true;

  div1Function() {
    this.div1 = true;
    this.div2 = false;
  }
  div2Function() {
    this.div2 = true;
    this.div1 = false;
  }

}
