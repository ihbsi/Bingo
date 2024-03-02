import { Component, OnInit } from '@angular/core';
import { BingoCard } from '../../interfaces/bingo';
import { BingoService } from '../../services/bingo-services/bingo.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util-services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = 'Para Jessica, mi novia';
  message: string = 'Eres mi Lunita consentida';
  srcImg: string = 'https://cdn.pixabay.com/photo/2023/08/12/13/43/moon-8185650_1280.png';
  dataBingo: BingoCard[] = [];
  hiddenButton: boolean = true;

  constructor(
    private bingoService: BingoService,
    private utilservice: UtilService,
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.getBingoCard();
    this.hiddenButton = !this.utilservice.isHappyDate();
  }

  async getBingoCard() {
    this.dataBingo = [];
    let response = await this.bingoService.getBingoCard();

    if (response === undefined || response === null) {
      return;
    }

    for (let info of response.docs) {
      let data: BingoCard = {
        id: info.data()['id'],
        text: info.data()['text'],
        active: info.data()['active'],
        idFirebase: info.id
      }
      this.dataBingo.push(data);
    }

    this.sortList(this.dataBingo);
  }

  async uploadBingoCard() {
    let datosBingo = localStorage.getItem('datosBingo');
    if (datosBingo === null) {
      return;
    }
    let data = JSON.parse(datosBingo).dataBingo as BingoCard[];

    for (let value of data) {
      await this.bingoService.addBingoCard(value);
    }
  }

  async updateCard() {
    let valueBingoCard = this.dataBingo[0];
    await this.bingoService.updateValueCard({
      idFirebase: valueBingoCard.idFirebase,
      id: valueBingoCard.id,
      text: valueBingoCard.text,
      active: !valueBingoCard.active
    });

    this.getBingoCard();
  }

  sortList(list: Array<any>) {
    list.sort((x, y) => {
      if (x.id > y.id) { return 1; }
      return ((y.id > x.id) ? -1 : 0)
    });
  }

  goToBingo() {
    this.router.navigateByUrl('bingo');
  }
}