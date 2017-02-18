import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtTypeaheadComponent } from './gt-typeahead/gt-typeahead.component';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [GtTypeaheadComponent],
  exports:[GtTypeaheadComponent]
})
export class TypeaheadModule { }
