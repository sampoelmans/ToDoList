import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from "src/app/models/Item";
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input() item: Item;
  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(private router: Router,private itemService: ItemService,private categoryService: CategoryService) { 
  }

  ngOnInit(): void {
    this.getItems();
  }
  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.deleteItem$.unsubscribe();
  }
  add() {
    //Navigate to form in add mode
    this.router.navigate(['item/form'], { state: { mode: 'add' } });
  }
  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['item/form'], { state: { id: id, mode: 'edit' } });
  }
  deleteItem(item: Item) {
    this.items = this.items.filter(t => t.id != item.id);
    this.itemService.deleteItem(item).subscribe();
  }
  getItems() {
    this.items$ = this.itemService.getItems().subscribe(result => this.items = result);
  }
  onClick(itemId: number) {
    this.router.navigate(['/todo', itemId])
  }
}
