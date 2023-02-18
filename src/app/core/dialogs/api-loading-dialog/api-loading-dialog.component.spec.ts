import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoadingDialogComponent } from './api-loading-dialog.component';

describe('ApiLoadingDialogComponent', () => {
  let component: ApiLoadingDialogComponent;
  let fixture: ComponentFixture<ApiLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLoadingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
