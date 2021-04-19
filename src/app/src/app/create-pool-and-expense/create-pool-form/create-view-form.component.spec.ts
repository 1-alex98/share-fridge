import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewFormComponent } from './create-view-form.component';

describe('CreateViewFormComponent', () => {
  let component: CreateViewFormComponent;
  let fixture: ComponentFixture<CreateViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateViewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
