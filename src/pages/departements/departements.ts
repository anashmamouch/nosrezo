import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SimulateurnotairePage } from '../simulateurnotaire/simulateurnotaire';


@Component({
  selector: 'page-departements',
  templateUrl: 'departements.html'
})


export class DepartementsPage {

  departements:any;
  montantAchat:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.departements = this.navParams.get('departements');
    this.montantAchat = this.navParams.get('montantAchat');

    console.log(':::DEPARTEMENT-LIST:::', this.departements); 
    console.log(':::DEPARTEMENT-MONTANT-ACHAT:::', this.montantAchat); 

  }

  clickDepartement(dep){
    console.log(dep); 
    this.navCtrl.setRoot(SimulateurnotairePage, {dep: dep, montantAchat: this.montantAchat}); 
  }


}
