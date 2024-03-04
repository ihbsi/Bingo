import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util-services/util.service';
import { Router } from '@angular/router';
import { BingoFirebase } from '../../interfaces/bingo';
import { BingoFirebaseService } from '../../services/bingo-firebase-services/bingoFirebase.service';
import { lastValueFrom } from 'rxjs';
import { BingoLocalService } from '../../services/bingo-local-services/bingoLocal.service';
import { BingoCard } from '../../interfaces/card';
import { AlertTypes } from 'src/app/bingo/enums/enums';

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
  isLoaded: boolean = false;
  maxRows: number = 5;
  maxColumns: number = 5;

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
    this.isLoaded = true;
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

  FillBingoCard() {
    for (let index = 0; index < (this.dataBingo.length / this.maxRows); index++) {
      let cellBingo: BingoCard = {
        BColumn: this.dataBingo[index],
        IColumn: this.dataBingo[index + this.maxRows],
        NColumn: this.dataBingo[index + this.maxRows * 2],
        GColumn: this.dataBingo[index + this.maxRows * 3],
        OColumn: this.dataBingo[index + this.maxRows * 4],
      }
      this.bingoCard.push(cellBingo);
    }
  }

  changeState(cellBingo: BingoFirebase) {
    cellBingo.active = !cellBingo.active;
    this.bingoFirebaseService.updateCardFirebase(cellBingo);
    this.validateRewards(cellBingo);
  }

  validateRewards(cellBingo: BingoFirebase) {
    this.validateRowReward(cellBingo);
    this.validateColumnReward(cellBingo);
    this.validateFirstDiagonalReward(cellBingo);
    this.validateSecondDiagonalReward(cellBingo);
    this.validateBingoCardReward();
  }

  validateRowReward(cellBingo: BingoFirebase) {
    let numRow: number = this.getCellRow(cellBingo);
    let filterRowActive = this.dataBingo.filter((cell) => {
      return cell.active === true && numRow === this.getCellRow(cell)
    })

    if (filterRowActive.length === this.maxRows) {
      console.log(`logrado: fila ${numRow}`);
    }
  }

  validateColumnReward(cellBingo: BingoFirebase) {
    let filterColumnActive = this.dataBingo.filter((cell) => {
      return cell.active === true && cellBingo.column === cell.column
    })

    if (filterColumnActive.length === this.maxColumns) {
      console.log(`logrado: columna "${cellBingo.column}"`);
    }
  }

  validateFirstDiagonalReward(cellBingo: BingoFirebase) {
    let maxDiagonal: number = this.maxRows < this.maxColumns ? this.maxRows : this.maxColumns;

    if (!this.isFirstDiagonal(cellBingo)) {
      return;
    }

    let filterFirstDiagonalActive = this.dataBingo.filter((cell) => {
      return cell.active === true && this.isFirstDiagonal(cell)
    })

    if (filterFirstDiagonalActive.length === maxDiagonal) {
      console.log('logrado: Diagonal \\');
    }
  }

  validateSecondDiagonalReward(cellBingo: BingoFirebase) {
    let maxDiagonal: number = this.maxRows < this.maxColumns ? this.maxRows : this.maxColumns;

    if (!this.isSecondDiagonal(cellBingo)) {
      return;
    }

    let filterSecondDiagonalActive = this.dataBingo.filter((cell) => {
      return cell.active === true && this.isSecondDiagonal(cell)
    })

    if (filterSecondDiagonalActive.length === maxDiagonal) {
      console.log('logrado: Diagonal /');
    }
  }

  validateBingoCardReward() {
    let cellBingoActive = this.dataBingo.filter((cell) => {
      return cell.active === true
    })

    if (cellBingoActive.length === this.dataBingo.length) {
      this.utilservice.Alert(
        '¡<b>Bingo</b> Completado!',
        'Recompensas',
        AlertTypes.Success
      );
    }
  }

  getCellRow(cellBingo: BingoFirebase): number {
    switch (cellBingo.column) {
      case 'B':
        return cellBingo.id;
      case 'I':
        return cellBingo.id - this.maxRows;
      case 'N':
        return cellBingo.id - (this.maxRows * 2);
      case 'G':
        return cellBingo.id - (this.maxRows * 3);
      case 'O':
        return cellBingo.id - (this.maxRows * 4);
      default:
        return 0;
    }
  }

  isFirstDiagonal(cellBingo: BingoFirebase): boolean {
    return (this.displayedColumns.indexOf(cellBingo.column) + 1) === this.getCellRow(cellBingo);
  }

  isSecondDiagonal(cellBingo: BingoFirebase): boolean {
    return this.displayedColumns[this.displayedColumns.length - this.getCellRow(cellBingo)] === cellBingo.column;
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
