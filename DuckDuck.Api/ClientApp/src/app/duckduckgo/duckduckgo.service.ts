import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILink } from '../shared/models/link.interface';
import { DuckduckApiService } from '../shared/services/duckduck-api.service';

@Injectable({
  providedIn: 'root'
})
export class DuckduckgoService {
  private links$: BehaviorSubject<Array<ILink>> = new BehaviorSubject<Array<ILink>>([]);
  
  employees: Observable<Array<ILink>> = this.links$.asObservable();

  constructor(private readonly _api: DuckduckApiService) { }

  GetDuckDuckGo(query: string): void {
    this._api.GetDuckDuckData(query).subscribe(res => this.links$.next(res));
  }
}
