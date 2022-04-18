import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DuckduckgoComponent } from './duckduckgo.component';
import { DuckduckSearchComponent } from './duckduck-search/duckduck-search.component';
import { DuckduckResultsComponent } from './duckduck-results/duckduck-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { DuckduckHistoryComponent } from './duckduck-history/duckduck-history.component';
import { SharedModule } from '../shared/shared.module';

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
    DuckduckResultsComponent,
    DuckduckHistoryComponent
  ],
  exports: [
    DuckduckgoComponent,
    DuckduckSearchComponent,
    DuckduckResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ]
})
export class DuckduckgoModule { }
