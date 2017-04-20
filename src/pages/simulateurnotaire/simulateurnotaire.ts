import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'; 

import { DepartementsPage } from '../departements/departements'; 

@Component({
  selector: 'page-simulateurnotaire',
  templateUrl: 'simulateurnotaire.html'
})
export class SimulateurnotairePage {

  idAffiliate:any; 
  API:any; 

  montantAchat:any;
  departement:any; 
  typeBien:any;

  departements:any;

  dep:any;
  depNom:any;

  notaireData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {

    this.idAffiliate = localStorage.getItem('id_affiliate'); 
    this.API = localStorage.getItem('api'); 

    this.departements = [] ;
    this.notaireData = ''; 

    this.getDepartements(); 

    this.depNom = ' '; 

    if(this.navParams.get('dep')){
      this.dep = this.navParams.get('dep');
      this.depNom = this.dep['nom_departement'];
    }

    if(this.navParams.get('montantAchat')){
      this.montantAchat = this.navParams.get('montantAchat');
    }
    
  }

  goDepartements(){
    if(this.departements && this.montantAchat)
    this.navCtrl.push(DepartementsPage, { departements: this.departements, montantAchat: this.montantAchat } ); 
  }

  getDepartements(){ 
    let URL = this.API + "/api_info_eni_dept_ouvert.php";

    this.http
        .get(URL)
        .subscribe(
          data => {
            this.departements = JSON.parse(data['_body']); 

            console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\departements', this.departements); 
          },
          error => {
            console.log('error departements', error); 
          }
        )
  }

  calculFraisNotaire(){
    console.log('montant achat', this.montantAchat); 
    console.log('departement', this.departement); 
    console.log('type de bien', this.typeBien);
    console.log('-----------------------------------'); 

    if(this.montantAchat && this.dep && this.typeBien){

        let URL = this.API + "/api_calcul_frais_notaire.php"; 

        let data = {
          montant_achat_bien:  this.montantAchat, 
          taux_vote_departement: this.dep['taux_vote'],
          type_bien: this.typeBien,
          id_affiliate: this.idAffiliate
        }

        console.log('______________________URL-NOTAIRE______________________', URL); 
        console.log('_____________________data-notaire_____________________', data); 

        this.http
            .post(URL, data)
            .subscribe(
              data => {
                this.notaireData = JSON.parse(data['_body'])[0];
                console.log(':FRAIS NOTAIRE:', this.notaireData); 
              }, 
              error => {
                console.log('error', error); 
              }
            )

        console.log('<==data==>', data); 
    }
  }
}
