import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckduckHistoryComponent } from './duckduck-history.component';

describe('DuckduckHistoryComponent', () => {
  let component: DuckduckHistoryComponent;
  let fixture: ComponentFixture<DuckduckHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuckduckHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuckduckHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
