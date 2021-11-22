import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app//models/Item';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categories$: Subscription = new Subscription();
  isAdd: boolean = false;
  isEdit: boolean = false;
  itemId: number = 0;
  item: Item = { id: 0, name: "", categoryId: 0, category:null };
  category: Category = { id: 0, name: "", color: "" };
  isSubmitted: boolean = false;
  errorMessage: string = "";
  item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  constructor(private router: Router, private itemService: ItemService, private categoryService: CategoryService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.itemId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.itemId != null && this.itemId > 0) {
      this.item$ = this.itemService.getItemById(this.itemId).subscribe(result => this.item = result);
      // console.log(this.item$)
    }
  }
  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
    this.categories$.unsubscribe();
  }
  ngOnInit(): void {
    this.getCategories();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postItem$ = this.itemService.addItem(this.item).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/todolist");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.putItem$ = this.itemService.editItem(this.itemId, this.item).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/todolist");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }
  getCategories() {
    this.categories$ = this.categoryService.getCategories().subscribe(result => this.categories = result);
  }
}
