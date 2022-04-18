import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ILink } from '../models/link.interface';
import { BaseHttpService } from './base-http.service';
import { IDuckDuckListAndHistory } from '../models/duck-duck-list-history.interface';
import { IQuery } from '../models/query.interface';

@Injectable({
  providedIn: 'root'
})
export class DuckduckApiService extends BaseHttpService {
  readonly _baseUrl = "https://localhost:5001/api/v1/duckDuckGo";

  constructor(private readonly _http: HttpClient) {
    super();
  }

  GetDuckDuckData(q: string): Observable<Array<ILink>> {
    return this._http.get<Array<ILink>>(`${this._baseUrl}/?q=${q}`, this.getOptions());
  }

  GetDuckDuckDataAndHistory(q: string, historyQueries: Array<string>): Observable<IDuckDuckListAndHistory> {
    const body: IQuery = { query : q, historyQueries: historyQueries };
    return this._http.post<IDuckDuckListAndHistory>(this._baseUrl, body, this.getOptions());
  }

  GetDuckDuckMode(): Observable<boolean> {
    return this._http.get<boolean>(`${this._baseUrl}/mode`, this.getOptions());
  }

  SetDuckDuckMode(mode: boolean): Observable<void> {
    const body = { isArchived: mode };
    return this._http.post<void>(`${this._baseUrl}/mode`, body, this.getOptions());
  }
}
