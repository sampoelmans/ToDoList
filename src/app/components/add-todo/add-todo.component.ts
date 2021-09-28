import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  task:string;
  description:string;
  catogorie:string;
  color:string;
  @Output() addTodo : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // adds the todo in the list
  saveTask() {
    const todo =
    {
      title : this.task,
      catogorie : this.catogorie,
      description : this.description,
      color : this.color,
      completed:false
    }
    this.addTodo.emit(todo);
  }
}
