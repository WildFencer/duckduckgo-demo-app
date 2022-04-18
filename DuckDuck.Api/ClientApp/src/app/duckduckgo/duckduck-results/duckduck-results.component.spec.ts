import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckduckResultsComponent } from './duckduck-results.component';

describe('DuckduckResultsComponent', () => {
  let component: DuckduckResultsComponent;
  let fixture: ComponentFixture<DuckduckResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuckduckResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuckduckResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
