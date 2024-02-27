import { Component, OnInit } from '@angular/core';
import { Bingo } from '../interfaces/bingo';
import { BingoService } from '../services/bingo.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private bingoService: BingoService) { }

  async ngOnInit(): Promise<void> {
    let data: Bingo[] = await lastValueFrom(this.bingoService.getAll());
    debugger;
    console.log(data);
  }
}
