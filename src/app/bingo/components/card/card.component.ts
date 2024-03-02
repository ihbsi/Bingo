import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util-services/util.service';
import { Router } from '@angular/router';
import { BingoFirebase } from '../../interfaces/bingo';
import { BingoService } from '../../services/bingo-services/bingo.service';
import { BingoCard } from '../../interfaces/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  dataBingo: BingoFirebase[] = [];
  displayedColumns: string[] = ['B', 'I', 'N', 'G', 'O'];
  dataSource: BingoCard[] = [];
  bingoCard: BingoCard[] = [];

  constructor(
    private bingoService: BingoService,
    private utilservice: UtilService,
    private router: Router) {
  }

  async ngOnInit() {
    this.goToHome()
    await this.getBingoFirebase();
    this.FillBingoCard();
    this.dataSource = this.bingoCard;
  }

  async getBingoFirebase() {
    this.dataBingo = [];
    let response = await this.bingoService.getBingoFirebase();

    if (response === undefined || response === null) {
      return;
    }

    for (let info of response.docs) {
      let data: BingoFirebase = {
        id: info.data()['id'],
        text: info.data()['text'],
        column: info.data()['column'],
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
    let data = JSON.parse(datosBingo).dataBingo as BingoFirebase[];

    for (let value of data) {
      await this.bingoService.addBingoCardFirebase(value);
    }
  }

  async updateCard() {
    let valueBingoCard = this.dataBingo[0];
    await this.bingoService.updateCardFirebase({
      idFirebase: valueBingoCard.idFirebase,
      id: valueBingoCard.id,
      text: valueBingoCard.text,
      column: valueBingoCard.column,
      active: !valueBingoCard.active
    });

    this.getBingoFirebase();
  }

  FillBingoCard() {
    for (let index = 0; index < (this.dataBingo.length); index = index + 5) {
      let cellBingo: BingoCard = {
        BColumn: this.dataBingo[index],
        IColumn: this.dataBingo[index + 1],
        NColumn: this.dataBingo[index + 2],
        GColumn: this.dataBingo[index + 3],
        OColumn: this.dataBingo[index + 4],
      }

      this.bingoCard.push(cellBingo);
    }
  }

  changeState(cellBingo: BingoFirebase) {

  }

  sortList(list: Array<any>) {
    list.sort((x, y) => {
      if (x.id > y.id) { return 1; }
      return ((y.id > x.id) ? -1 : 0)
    });
  }

  goToHome() {
    if (!this.utilservice.isHappyDate()) {
      this.router.navigateByUrl('');
    }
  }
}
