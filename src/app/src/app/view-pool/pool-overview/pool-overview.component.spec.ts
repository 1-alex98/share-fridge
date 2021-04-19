import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolOverviewComponent } from './pool-overview.component';

describe('PoolOverviewComponent', () => {
  let component: PoolOverviewComponent;
  let fixture: ComponentFixture<PoolOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
