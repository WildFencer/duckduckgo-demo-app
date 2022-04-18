import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckduckSearchComponent } from './duckduck-search.component';

describe('DuckduckSearchComponent', () => {
  let component: DuckduckSearchComponent;
  let fixture: ComponentFixture<DuckduckSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuckduckSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuckduckSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
