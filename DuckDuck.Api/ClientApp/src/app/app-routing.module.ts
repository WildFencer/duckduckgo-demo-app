import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuckduckgoComponent } from './duckduckgo/duckduckgo.component';

const routes: Routes = [
  {
    path: '**',
    loadChildren: () => import('./duckduckgo/duckduckgo.module').then(m => m.DuckduckgoModule)
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
