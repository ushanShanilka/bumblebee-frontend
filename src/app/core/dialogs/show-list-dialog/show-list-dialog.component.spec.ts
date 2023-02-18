import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListDialogComponent } from './show-list-dialog.component';

describe('ShowListDialogComponent', () => {
  let component: ShowListDialogComponent;
  let fixture: ComponentFixture<ShowListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
