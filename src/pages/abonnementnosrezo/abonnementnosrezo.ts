import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login'


@Component({
  selector: 'page-abonnementnosrezo',
  templateUrl: 'abonnementnosrezo.html'
})
export class AbonnementnosrezoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  deconnexion(){
    this.navCtrl.setRoot(LoginPage); 
  }


}
