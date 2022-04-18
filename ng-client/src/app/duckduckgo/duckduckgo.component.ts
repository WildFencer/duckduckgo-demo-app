import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILink } from '../shared/models/link.interface';
import { DuckduckgoService } from './duckduckgo.service';

@Component({
  selector: 'duckduckgo',
  templateUrl: './duckduckgo.component.html',
  styleUrls: ['./duckduckgo.component.scss']
})
export class DuckduckgoComponent implements OnInit, OnDestroy {

  private linksSubscription: Subscription|undefined;
  private queriesSubscription: Subscription|undefined;

  resultData: Array<ILink> = [];
  historyData: Array<string> = [];
  isArchived: boolean = false;
  preselectedQuery: string|undefined;
  appearences: number|undefined;
  searchTerms: Array<string> = [];

  constructor(private _ddg: DuckduckgoService) { }

  ngOnInit(): void {
    this._ddg.GetDuckDuckMode();
    this.linksSubscription = this._ddg.links.subscribe((links: Array<ILink>) => {
      this.resultData = links;
      this.searchTerms = this._ddg.activeQuery?.split(' ') as Array<string>;
      this.appearences = this.countQueryAppearences(this._ddg.activeQuery as string);
    });
    this.queriesSubscription = this._ddg.historyQueries.subscribe((queries: Array<string>) => {
      this.historyData = queries;
      this.isArchived = this._ddg.mode;
    });
  }
  
  ngOnDestroy(): void {
    this.linksSubscription?.unsubscribe();
    this.queriesSubscription?.unsubscribe();
  }

  onSearchRequested(query: string): void {
    if (!this.isArchived)
      this._ddg.GetDuckDuckGo(query);
    else
      this._ddg.GetDuckDuckListAndHistory(query);
  }

  setPreselectedQuery(query: string): void {
    this.preselectedQuery = query;
  }

  onModeChange(): void {
    this._ddg.SetDuckDuckMode(this.isArchived);
  }

  private countQueryAppearences(query: string): number | undefined {
    if (!query) return;
    const resultAsString = this.resultData.map(r => r.title).join(' ');
    const pat = new RegExp(query, 'gi')
    return (resultAsString.match(pat) || []).length;
  }

}
