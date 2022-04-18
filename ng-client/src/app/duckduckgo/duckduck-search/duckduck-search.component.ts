import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'duckduck-search',
  templateUrl: './duckduck-search.component.html',
  styleUrls: ['./duckduck-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuckduckSearchComponent implements OnInit, OnChanges {

  @Input() preselected: string|undefined;
  @Output() query: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchQuery', { read: MatInput }) searchQuery!: MatInput;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preselected'].currentValue?.length > 0) {
      this.searchQuery.value = this.preselected;
      this.preselected = undefined;
    }
  }

  onClick(searchQuery: string): void {
    if (searchQuery.length > 0)
      this.query.emit(searchQuery);
  }
}
