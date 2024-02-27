import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bingo } from '../interfaces/bingo';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Bingo[]>('http://localhost:3000/dataBingo')
  }
}
