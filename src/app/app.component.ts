import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//import pages
import { LoginPage } from '../pages/login/login';
import { AccueilPage } from '../pages/accueil/accueil';
import { MiseenrelationPage } from '../pages/miseenrelation/miseenrelation';
import { Miseenrelation2Page } from '../pages/miseenrelation2/miseenrelation2';
import { ParrainerPage } from '../pages/parrainer/parrainer';
import { MonequipePage } from '../pages/monequipe/monequipe';
import { AperorezoPage } from '../pages/aperorezo/aperorezo';
import { RecommandationsPage } from '../pages/recommandations/recommandations';
import { Recommandations2Page } from '../pages/recommandations2/recommandations2';
import { PaiementPage } from '../pages/paiement/paiement'; 
import { OutilsPage } from '../pages/outils/outils';
import { PreferencesPage } from '../pages/preferences/preferences';
import { TabsPage } from '../pages/tabs/tabs'; 
import { VideosPage } from '../pages/videos/videos'; 
import { AproposPage } from '../pages/apropos/apropos'; 

import { DepartementsPage } from '../pages/departements/departements'; 

import { Miseenrelation3Page } from '../pages/miseenrelation3/miseenrelation3';

import { PersonnelPage } from '../pages/personnel/personnel';

import { Http } from '@angular/http';

//storage
import { Storage } from '@ionic/storage';


//import services
import { Api } from '../providers/api';

//import menu
import { MenuController } from 'ionic-angular'
import { TranslateService } from 'ng2-translate'; 

//events
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: any;

  nom:string;
  image:string;
  recommandations:any; 

  response:any; 

  constructor(public platform: Platform, public events:Events, public api:Api, public storage:Storage, public menuCtrl: MenuController, public translate:TranslateService, public http:Http/*, public push:Push, public translate:TranslateService*/) {
    this.initializeApp();

    translate.setDefaultLang('fr'); 
    translate.use('fr'); 

    this.recommandations = ' '; 

    this.pages = api.pages; 
    this.recommandations = localStorage.getItem('nb_reco_retard'); 

    this.events.subscribe('page:clicked', (page) => {
      if(page.title == 'Recommandations'){
        this.recommandations = 0 ; 

        this.storage.ready().then(() => {
            this.storage.set('recommandations', 0); 
        }); 

        console.log('<<<<<RECOMMANDATIONS>>>>>', this.recommandations); 
       
      }
    }); 

    console.log('+++++++++++LANGUAGE+++++++++++', localStorage.getItem('language')); 

    console.log('--------------------->>> API', localStorage.getItem('api')); 
    console.log('--------------------->>> ID AFFILIATE', localStorage.getItem('id_affiliate'))

    let URL = localStorage.getItem('api') + 'api_return_info_affiliate.php?term='+localStorage.getItem('id_affiliate'); 
    console.log('%%%%%%%URL%%%%%%%', URL); 
    this.nom = localStorage.getItem('nom');
    this.image = api.image;
  }

  initializeApp() {
    console.log("Hello App Component");
     Splashscreen.hide();
      this.platform.ready().then(() => {

        this.menuOpened(); 

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        StatusBar.styleDefault();
        console.log("Platform is ready...");
      });

  }

  menuClosed() {
    console.log('~~~~~~~~~~~~CLOSE--(|.|)--MENU~~~~~~~~~~~~'); 
  }

  menuOpened() {
      console.log('~~~~~~~~~~~~OPEN--(|.|-|.|)--MENU~~~~~~~~~~~~'); 


      this.storage.ready().then(() =>{

      this.storage.get('pagess').then((val) => {
          console.log('~~~~~~~~>PAGES', val);
          this.pages = JSON.parse(val); 
      });

      this.storage.get('recommandations').then((val) =>{
            this.recommandations = JSON.parse(val); 
      }); 

    }); 
   
  }

  openPage(page) {
    console.log('<-----------------:PAGE:----------------->', page);

    this.events.publish('page:clicked', page); 

    if(page.title == 'Dashboard'){
      this.nav.setRoot(AccueilPage);
    }else if(page.title == 'Mise en relation'){
      this.nav.setRoot(Miseenrelation3Page);
    }else if(page.title == 'Mise en relation 2'){
      this.nav.setRoot(Miseenrelation2Page);
    }else if(page.title == 'Mise en relation 3'){
      this.nav.setRoot(Miseenrelation3Page); 
    }else if(page.title == 'Parrainer un ami'){
      this.nav.setRoot(ParrainerPage); 
    }else if(page.title == 'Mon Equipe'){
      this.nav.setRoot(MonequipePage); 
    }else if(page.title == 'AperoRezo'){
      this.nav.setRoot(AperorezoPage); 
    }else if(page.title == 'Recommandations à traiter'){
      this.nav.setRoot(RecommandationsPage); 
    }else if(page.title == 'Recommandations'){
      this.api.recommandations = "0 " ; 
      this.nav.setRoot(Recommandations2Page); 
    }else if(page.title == 'Outils'){
      this.nav.setRoot(OutilsPage); 
    }else if(page.title == 'Préférences'){
      this.nav.setRoot(PreferencesPage); 
    }else if(page.title == 'Mon profile'){
      this.nav.setRoot(PersonnelPage); 
    }else if(page.title == 'Paiement'){
      this.nav.setRoot(PaiementPage); 
    }else if(page.title == 'Videos'){
      this.nav.setRoot(VideosPage); 
    }else if(page.title == 'A propos'){
      this.nav.setRoot(AproposPage); 
    }
  }

  goToProfile(){
    this.nav.setRoot(PersonnelPage);
  }

  ionViewDidLoad(){
    this.nom = localStorage.getItem('nom');
    this.image = localStorage.getItem('image');
  }

}
