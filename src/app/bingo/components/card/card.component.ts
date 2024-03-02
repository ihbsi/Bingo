import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util-services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  constructor(
    private utilservice: UtilService,
    private router: Router) {
  }
  
  ngOnInit() {
    this.goToHome()
  }

  goToHome() {    
    if(!this.utilservice.isHappyDate()){
      this.router.navigateByUrl('');
    }
  }
}
