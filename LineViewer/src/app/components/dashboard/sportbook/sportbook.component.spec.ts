import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportbookComponent } from './sportbook.component';

describe('SportbookComponent', () => {
  let component: SportbookComponent;
  let fixture: ComponentFixture<SportbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
