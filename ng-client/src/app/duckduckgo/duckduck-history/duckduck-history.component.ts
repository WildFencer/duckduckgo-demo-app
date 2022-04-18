import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DuckduckgoService } from '../duckduckgo.service';

@Component({
  selector: 'duckduck-history',
  templateUrl: './duckduck-history.component.html',
  styleUrls: ['./duckduck-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuckduckHistoryComponent implements OnInit {

  @Input() data: Array<string> = [];
  @Output() queryToPreselect: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private _ddg: DuckduckgoService) { }

  ngOnInit(): void {
  }

  activateQuery(query: string): void {
    if (!this._ddg.mode)
      this._ddg.GetDuckDuckGo(query);
    else
      this._ddg.GetDuckDuckListAndHistory(query);
    this.queryToPreselect.emit(query);
  }
}
