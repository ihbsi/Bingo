import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BingoRoutingModule } from './bingo-routing.module';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    HomeComponent,
    EditComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BingoRoutingModule
  ]
})
export class BingoModule { }
