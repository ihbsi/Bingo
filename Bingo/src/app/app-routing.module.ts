import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bingo/home/home.component';

const routes: Routes = [
  {path: 'bingo/home', component: HomeComponent},
  {path: 'bingo', redirectTo: 'bingo/home', pathMatch:'full'},
  {path: '', redirectTo: 'bingo/home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
