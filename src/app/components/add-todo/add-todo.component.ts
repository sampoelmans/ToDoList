import { Component, OnInit,OnDestroy, EventEmitter, Output } from '@angular/core';
import { Todo } from "src/app/models/Todo";
import { TodoService } from "src/app/services/todo.service";
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy{
  isAdd: boolean = false;
  isEdit: boolean = false;

  todoId: number = 0;
  todo : Todo = {id:0, title:"", description:"",color:"", startdate: new Date(),completed:false,itemId:0};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  todo$: Subscription = new Subscription();
  postTodo$: Subscription = new Subscription();
  putTodo$: Subscription = new Subscription();

  

  constructor(private router: Router, private todoService: TodoService) { 
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.todoId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.todoId != null && this.todoId > 0) {
      this.todo$ = this.todoService.getTodoById(this.todoId).subscribe(result => this.todo = result);
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.todo$.unsubscribe();
    this.postTodo$.unsubscribe();
    this.putTodo$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postTodo$ = this.todoService.addTodo(this.todo).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/todo");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putTodo$ = this.todoService.editTodo(this.todoId, this.todo).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/todo");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }
}
