import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bingo } from '../interfaces/bingo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  private dataBingoUrl = 'assets/data-bingo.json';
  constructor(private httpClient: HttpClient) { }

  getDataJson(): Observable<Bingo[]> {
    return this.httpClient.get<Bingo[]>(this.dataBingoUrl)
  }

  getLocalData(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  saveLocalData(key: string, dataBingo: Bingo[]): void {
    localStorage.setItem(key, JSON.stringify(dataBingo));
  }
}
