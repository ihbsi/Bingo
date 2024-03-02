import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util-services/util.service';
import { Router } from '@angular/router';
import { BingoFirebase } from '../../interfaces/bingo';
import { BingoFirebaseService } from '../../services/bingo-firebase-services/bingoFirebase.service';
import { lastValueFrom } from 'rxjs';
import { BingoLocalService } from '../../services/bingo-local-services/bingoLocal.service';
import { BingoCard } from '../../interfaces/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  dataBingo: BingoFirebase[] = [];
  displayedColumns: string[] = ['B', 'I', 'N', 'G', 'O'];
  bingoCard: BingoCard[] = [];
  dataSource: BingoCard[] = [];

  constructor(
    private bingoFirebaseService: BingoFirebaseService,
    private bingoLocalService: BingoLocalService,
    private utilservice: UtilService,
    private router: Router) {
  }

  async ngOnInit() {
    this.goToHome();
    await this.getBingoFirebase();
    this.FillBingoCard();
    this.dataSource = this.bingoCard;
  }

  async getBingoFirebase() {
    this.dataBingo = [];
    let response = await this.bingoFirebaseService.getBingoFirebase();

    if (response === undefined || response === null) {
      return;
    }

    if (response.docs.length === 0) {
      await this.uploadLocalBingoCard();
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

  async uploadLocalBingoCard() {
    let result = await lastValueFrom(this.bingoLocalService.getDataJson());

    for (let value of result.dataBingo) {
      this.bingoFirebaseService.addBingoCardFirebase(value);
    }
    await this.getBingoFirebase();
  }

  async updateCard() {
    let valueBingoCard = this.dataBingo[0];
    await this.bingoFirebaseService.updateCardFirebase({
      idFirebase: valueBingoCard.idFirebase,
      id: valueBingoCard.id,
      text: valueBingoCard.text,
      column: valueBingoCard.column,
      active: !valueBingoCard.active
    });

    this.getBingoFirebase();
  }

  FillBingoCard() {
    for (let index = 0; index < (this.dataBingo.length / 5); index++) {
      let cellBingo: BingoCard = {
        BColumn: this.dataBingo[index],
        IColumn: this.dataBingo[index + 5],
        NColumn: this.dataBingo[index + 10],
        GColumn: this.dataBingo[index + 15],
        OColumn: this.dataBingo[index + 20],
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
