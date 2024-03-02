import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isHappyDate() {
    let happyDate = new Date('03-03-2024');
    return happyDate <= new Date();
  }
}
