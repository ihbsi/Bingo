import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bingo/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'card',
    loadChildren: () => import('./bingo/bingo.module').then(m => m.BingoModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
