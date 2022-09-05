import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GTableRoutingModule } from './gtable-routing.module';
import { GTableComponent } from './gtable/gtable.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    GTableComponent
  ],
  imports: [
    CommonModule,
    GTableRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class GTableModule { }
