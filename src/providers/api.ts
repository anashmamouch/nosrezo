import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

 //import pages
import { LoginPage } from '../pages/login/login';
import { AccueilPage } from '../pages/accueil/accueil';
import { MiseenrelationPage } from '../pages/miseenrelation/miseenrelation';
import { Miseenrelation2Page } from '../pages/miseenrelation2/miseenrelation2';
import { ParrainerPage } from '../pages/parrainer/parrainer';
import { MonequipePage } from '../pages/monequipe/monequipe';
import { AperorezoPage } from '../pages/aperorezo/aperorezo';
import { PaiementPage } from '../pages/paiement/paiement'; 
import { RecommandationsPage } from '../pages/recommandations/recommandations';
import { Recommandations2Page } from '../pages/recommandations2/recommandations2';
import { OutilsPage } from '../pages/outils/outils';
import { PreferencesPage } from '../pages/preferences/preferences';
import { AproposPage } from '../pages/apropos/apropos'

import { Miseenrelation3Page } from '../pages/miseenrelation3/miseenrelation3';

import { PersonnelPage } from '../pages/personnel/personnel';

import { Storage } from '@ionic/storage';

import { Events } from 'ionic-angular';


@Injectable()
export class Api {
 
  data: any= null;
  image:string = '';
  message: any = "I'm new here";
  API:string = ""; 

  URL:string; 

  recommandations:string; 

  autocompleteURL:any; 

  clickReco:boolean; 

  pages:any;

  constructor(public http: Http, public storage: Storage, public events: Events) {

    console.log('Hello Api Provider');
    this.data ={'first_and_last_name': ''};

    localStorage.setItem('api', "http://www.nosrezo.com/scripts/API_MOBILE_V3/");

    this.API = localStorage.getItem('api'); 

    storage.ready().then(() => { 
      storage.set('anas', 'this is a storage string');
    });  
  }

  setMessage(message) {
    this.message = message;
  }

  getInfo(id){
    this.URL = this.API + 'api_return_info_affiliate.php?term='+id;

    this.http.get(this.URL).subscribe(data=>{

      let response = JSON.parse(data['_body'])[0]; 

      console.log('####RESPONSE####', response); 
     
      let fullName = response['first_name'] + ' ' + response['last_name']; 
      let imageURL = response['photo_profil'];

      this.recommandations = response['nb_reco_retard']; 

      console.log("#####---------RECOMMANDATIONS---------#####", this.recommandations);

      console.log('api recommandations', this.recommandations); 

      localStorage.setItem('reco_retard', response['nb_reco_retard']); 


        console.log('<<------MENU OPEN FROM API------>>');
       
        this.storage.ready().then(() => {
      
        console.log("|_________I'm inside the storage_________|"); 

        console.log("STORAGE<----------->PARTENAIRE ID", response['id_partenaire']); 
        console.log("STORAGE<----------->ID AFFILIATE", response['id_affiliate']);

          if(response['id_partenaire'] != 0 ){

            console.log('MENU ID PARTENAIRE'); 
              
              this.pages = [
                            { title: 'Dashboard', component: AccueilPage, icon: 'ios-stats-outline' },
                            { title: 'Mise en relation', component: Miseenrelation3Page, icon: 'ios-send-outline' },
                            { title: 'Parrainer un ami', component: ParrainerPage, icon: 'ios-add-circle-outline'},
                            { title: 'AperoRezo', component: AperorezoPage, icon: 'ios-wine-outline'},
                            { title: 'Recommandations', component: Recommandations2Page, icon: 'ios-folder-open-outline' },
                            { title: 'Videos', component: AproposPage, icon: 'logo-youtube' },
                            { title: 'A propos', component: AproposPage, icon: 'ios-information-circle-outline' },
                      ];
            }else{

            console.log('MENU ID PARTENAIRE'); 
              
              this.pages = [
                          { title: 'Dashboard', component: AccueilPage, icon: 'ios-stats-outline' },
                          { title: 'Mise en relation', component: Miseenrelation3Page, icon: 'ios-send-outline' },
                          { title: 'Parrainer un ami', component: ParrainerPage, icon: 'ios-add-circle-outline'},
                          { title: 'AperoRezo', component: AperorezoPage, icon: 'ios-wine-outline'},
                          { title: 'Videos', component: AproposPage, icon: 'logo-youtube' },
                          { title: 'A propos', component: AproposPage, icon: 'ios-information-circle-outline' },
                      ];
              } 

          console.log("STORAGE<----------->PAGES", JSON.stringify(this.pages))

          this.storage.set('pagess', JSON.stringify(this.pages));
          this.storage.set('recommandations', JSON.stringify(response['nb_reco_retard'])); 
        });

      this.events.subscribe('page:clicked', (item) => {

          console.log('||||API ITEM||||', item);

      });

      
      this.API.split('api_mobile'); 

      this.image = this.API.split('scripts')[0] + imageURL ; 
     
      this.data.first_and_last_name = fullName;

    }, error =>{
      console.log("this is an error ", error); 
    });
  }

}
