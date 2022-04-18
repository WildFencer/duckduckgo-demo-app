import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ILink } from '../models/link.interface';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DuckduckApiService extends BaseHttpService {
  readonly _baseUrl = "https://localhost:5001/api/v1/duckDuckGo";
  readonly _baseUrl1: string = `/api/v1/duckDuckGo`;

  constructor(private readonly _http: HttpClient) {
    super();
   }

  GetDuckDuckData(q: string): Observable<Array<ILink>> {
   return this._http.get<Array<ILink>>(`${this._baseUrl}/?q=${q}`);
 }
}
