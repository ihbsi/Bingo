import { Component, OnInit } from '@angular/core';
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
  hiddenButton: boolean = true;

  constructor(
    private utilservice: UtilService,
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.hiddenButton = !this.utilservice.isHappyDate();
  }

  goToBingo() {
    this.router.navigateByUrl('card');
  }
}