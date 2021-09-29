import { Component, OnInit, Input,  EventEmitter, Output } from "@angular/core";
import { Todo } from "src/app/models/Todo";
import { TodoService } from 'src/app/services/todo.service';
import {Router} from '@angular/router';
@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;  
  @Output() delTodo : EventEmitter<any> = new EventEmitter(); 

  constructor(private router: Router,private todoService: TodoService) {}

  ngOnInit(): void {
  }

  // saves the status of the todo as completed/uncompleted
  completeTodo(todo: Todo)
  {
    todo.completed = !todo.completed;
    this.todoService.completeTodo(todo).subscribe();
  }

  // deletes the selected todo
  deleteTodo(todo: Todo)
  {
    this.delTodo.emit(this.todo);
  }

   // set as completed task styling
   setCompleted()
   {
      let completedStyle = {
        todo : true,
        'is-complete' : this.todo.completed
      }
      return completedStyle;
   }
   edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['todo/form'], {state: {id: id, mode: 'edit'}});
  }
}
