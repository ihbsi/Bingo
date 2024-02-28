import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BingoRoutingModule } from './bingo-routing.module';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    EditComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BingoRoutingModule,
    MaterialModule
  ]
})
export class BingoModule { }
