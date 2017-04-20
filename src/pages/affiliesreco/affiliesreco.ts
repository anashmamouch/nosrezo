import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SimulateurgainsPage } from '../simulateurgains/simulateurgains'; 


@Component({
  selector: 'page-affiliesreco',
  templateUrl: 'affiliesreco.html'
})
export class AffiliesrecoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  clickReco(nombre){
    console.log(nombre);
    this.navCtrl.setRoot(SimulateurgainsPage, {nombreValeur: nombre});
  }

}
