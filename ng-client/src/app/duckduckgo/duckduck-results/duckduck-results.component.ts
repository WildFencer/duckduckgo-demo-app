import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { merge, of, startWith, switchMap } from 'rxjs';
import { ILink } from 'src/app/shared/models/link.interface';

@Component({
  selector: 'duckduck-results',
  templateUrl: './duckduck-results.component.html',
  styleUrls: ['./duckduck-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuckduckResultsComponent implements OnInit, OnChanges {

  @Input() data: Array<ILink> = [];
  @Input() searchTerms: Array<string> = [];
  
  dataSource: Array<ILink> = [];
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (((changes['data'].previousValue === null || changes['data'].previousValue?.length === 0)
          && changes['data'].currentValue?.length > 0)
        || (!(changes['data'].previousValue === null || changes['data'].previousValue?.length === 0)
          && changes['data'].previousValue != changes['data'].currentValue))
      this.linkListToPaginator();
    if (changes['data'].currentValue?.length === 0)
      this.dataSource = [];
  }

  onPageSelect(event: any): void {
    console.log(event);
    this.pageSize = event.pageSize;
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  private linkListToPaginator(): void {
    merge(this.paginator.page).pipe(
        startWith({}),
        switchMap(() => {
           return of(this.data);
    }))
    .subscribe(res => {
        const from = this.paginator.pageIndex * this.pageSize;
        const to = from + this.pageSize;
        this.dataSource = res.slice(from, to);
    });
  }
}
