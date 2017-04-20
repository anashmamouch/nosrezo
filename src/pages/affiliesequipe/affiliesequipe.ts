import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SimulateurgainsPage } from '../simulateurgains/simulateurgains'; 

@Component({
  selector: 'page-affiliesequipe',
  templateUrl: 'affiliesequipe.html'
})
export class AffiliesequipePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  clickEquipe(nombre){
    console.log(nombre);
    this.navCtrl.setRoot(SimulateurgainsPage, {nombrePercent: nombre});
  }
}
