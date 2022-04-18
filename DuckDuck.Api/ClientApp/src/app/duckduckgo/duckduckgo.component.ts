import { Component, OnInit } from '@angular/core';
import { DuckduckgoService } from './duckduckgo.service';

@Component({
  selector: 'duckduckgo',
  templateUrl: './duckduckgo.component.html',
  styleUrls: ['./duckduckgo.component.scss']
})
export class DuckduckgoComponent implements OnInit {

  constructor(private _ddg: DuckduckgoService) { }

  ngOnInit(): void {
    this._ddg.GetDuckDuckGo('abba');
  }

}
