import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from '../pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
