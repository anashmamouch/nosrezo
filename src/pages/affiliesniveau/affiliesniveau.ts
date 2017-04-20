import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SimulateurgainsPage } from '../simulateurgains/simulateurgains'; 

@Component({
  selector: 'page-affiliesniveau',
  templateUrl: 'affiliesniveau.html'
})
export class AffiliesniveauPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  clickNiveau(nombre){
    console.log(nombre);
    this.navCtrl.setRoot(SimulateurgainsPage, {nombreAffilies: nombre});
  }


}
