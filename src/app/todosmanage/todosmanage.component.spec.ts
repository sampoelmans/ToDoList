import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosmanageComponent } from './todosmanage.component';

describe('TodosmanageComponent', () => {
  let component: TodosmanageComponent;
  let fixture: ComponentFixture<TodosmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
