import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  categoryId: number = 0;

  category: Category = { id: 0, name: "", color: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();

  constructor(private router: Router, private categoryService: CategoryService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.categoryId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.categoryId != null && this.categoryId > 0) {
      this.category$ = this.categoryService.getCategoryById(this.categoryId).subscribe(result => this.category = result);
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  onClick() {
    this.router.navigate(['/category']);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postCategory$ = this.categoryService.postCategory(this.category).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/category");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.putCategory$ = this.categoryService.putCategory(this.categoryId, this.category).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/category");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

}