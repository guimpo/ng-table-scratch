import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GTableComponent } from './gtable/gtable.component';

const routes: Routes = [
  {
    path: '',
    component: GTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GTableRoutingModule { }
