import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isHappyDate() {
    let happyDate = new Date('03-03-2024');
    return happyDate <= new Date();
  }

  Alert(message: string, title: string, icon: SweetAlertIcon) {
    Swal.fire({
      icon: icon,
      title: title,
      html: message
    })
  }
}
