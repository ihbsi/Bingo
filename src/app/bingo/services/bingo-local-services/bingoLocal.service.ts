import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BingoCardFirebase, BingoFirebase } from '../../interfaces/bingo';

@Injectable({
  providedIn: 'root'
})
export class BingoLocalService {

  private dataBingoUrl = 'assets/data-bingo.json';
  constructor(private httpClient: HttpClient) { }

  getDataJson(): Observable<BingoCardFirebase> {
    return this.httpClient.get<BingoCardFirebase>(this.dataBingoUrl)
  }

  getLocalData(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  saveLocalData(key: string, dataBingo: BingoFirebase[]): void {
    localStorage.setItem(key, JSON.stringify(dataBingo));
  }
}