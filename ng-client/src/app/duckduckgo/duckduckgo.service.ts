import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDuckDuckListAndHistory } from '../shared/models/duck-duck-list-history.interface';
import { ILink } from '../shared/models/link.interface';
import { DuckduckApiService } from '../shared/services/duckduck-api.service';

@Injectable({
  providedIn: 'root'
})
export class DuckduckgoService {

  private links$: BehaviorSubject<Array<ILink>> = new BehaviorSubject<Array<ILink>>([]);
  private historyQueries$: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);
  
  links: Observable<Array<ILink>> = this.links$.asObservable();
  historyQueries: Observable<Array<string>> = this.historyQueries$.asObservable();
  activeQuery: string|undefined;
  mode: boolean = false;

  constructor(private readonly _api: DuckduckApiService) { }

  GetDuckDuckGo(query: string): void {
    this.activeQuery = query;
    this._api.GetDuckDuckData(query).subscribe((res: Array<ILink>) => {
      this.links$.next(res);
      this.UpdateQueriesHistory(query);
    });
  }

  GetDuckDuckListAndHistory(query: string): void {
    this.activeQuery = query;
    this._api.GetDuckDuckDataAndHistory(query, [...this.historyQueries$.value])
      .subscribe((res: IDuckDuckListAndHistory) => {
        this.links$.next(res.links);
        this.historyQueries$.next(res.queries);
      });
  }

  GetDuckDuckMode(): void {
    this._api.GetDuckDuckMode().subscribe((mode: boolean) => {
      this.mode = mode;
      if (!!mode)
        this._api.GetDuckDuckDataAndHistory('', [])
        .subscribe((res: IDuckDuckListAndHistory) => {
          this.links$.next(res.links);
          this.historyQueries$.next(res.queries);
        });
    });
  }

  SetDuckDuckMode(isArchived: boolean): void {
    this._api.SetDuckDuckMode(isArchived).subscribe();
  }

  private UpdateQueriesHistory(query: string): void {
    const queries: Array<string> = [...this.historyQueries$.value];

    if (queries.includes(query)) return;

    queries.push(query);
    this.historyQueries$.next(queries);
  }
}
