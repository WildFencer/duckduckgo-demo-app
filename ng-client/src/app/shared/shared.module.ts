import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightHitPipe } from './pipes/highlight-hit.pipe';



@NgModule({
  declarations: [
    HighlightHitPipe
  ],
  exports: [
    HighlightHitPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
