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
  title: string = 'Para Jessica, mi novia';
  message: string = 'Eres mi Lunita consentida';
  srcImg: string = 'https://cdn.pixabay.com/photo/2023/08/12/13/43/moon-8185650_1280.png';
  dataBingo: Bingo[] = [];

  constructor(private bingoService: BingoService) { }

  async ngOnInit(): Promise<void> {
    let result: Bingo[] = [];
    result =  await lastValueFrom(this.bingoService.getDataJson());
    this.dataBingo  = result;
    this.getLocalData();
  }

  getLocalData(){
    if(!this.bingoService.getLocalData('datosBingo')){
      this.saveLocalData();
    }
  }

  saveLocalData(){
    this.bingoService.saveLocalData('datosBingo', this.dataBingo);
  }
}
