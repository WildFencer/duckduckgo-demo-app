import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DuckduckgoComponent } from './duckduckgo.component';
import { DuckduckSearchComponent } from './duckduck-search/duckduck-search.component';
import { DuckduckResultsComponent } from './duckduck-results/duckduck-results.component';

const routes: Routes = [
  {
    path: '',
    component: DuckduckgoComponent
  }
];

@NgModule({
  declarations: [
    DuckduckgoComponent,
    DuckduckSearchComponent,
    DuckduckResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DuckduckgoModule { }
