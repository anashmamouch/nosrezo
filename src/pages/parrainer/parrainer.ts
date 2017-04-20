import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'page-parrainer',
  templateUrl: 'parrainer.html'
})

export class ParrainerPage {

    user:any; 

    API:any;
    parrainerForm: FormGroup;

    sec_num:any;

    response:any;

  constructor(public navCtrl: NavController, public alertController:AlertController, public loadingController:LoadingController, public fb:FormBuilder, public http:Http) {

    this.API = localStorage.getItem('api');

    this.user = {
        "gender": '',
        "nom": '',
        "prenom": '',
        "mobile": '',
        "email": '',
        "email2":'',
        "cp": '',
        "ville": '',
        "name_parrain": localStorage.getItem('first_name'), 
        "id_parrain": localStorage.getItem('id_affiliate'), 
    }

    this.validateForm();
  }

  //fonction pour valider les champs cote client
  validateForm(){
    this.parrainerForm = this.fb.group({
       "gender": ['', Validators.required],
       "nom": ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z\. ]+$')])],
       "prenom":  ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\. ]+$')])],
       "telephone" : ['', Validators.compose([Validators.required, Validators.pattern('^[\+0-9]+$')])],
       "email":['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$')])],
       "confirmEmail":['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$')])],
       "codePostal" :  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[0-9\. ]+$')])],
       "ville": ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z - àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\. ]+$')])],
    });
  }

parrainer(){

    this.showLoading();

    let URL:string = this.API + 'api_inscription_mobile.php'; 

    console.log("user parrainer", this.user);
    console.log("URL parrainer", URL);

    this.http
        .post(URL, this.user)
        .subscribe(
            data => { 
                console.log('datatata', data);
                this.response = JSON.parse(data['_body']);

                

                if(this.response['data'] == 100){
                    this.showAlert(" ", "VOTRE AMI EST MAINTENANT INSCRIT.", "OK"); 
                    
                    this.user = {
                        "gender": '',
                        "nom": '',
                        "prenom": '',
                        "mobile": '',
                        "email": '',
                        "email2":'',
                        "cp": '',
                        "ville": '',
                        "name_parrain": localStorage.getItem('first_name'), 
                        "id_parrain": localStorage.getItem('id_affiliate'), 
                    }

                }else{
                    this.showAlert(" ", this.response['ERROR_MESSAGE'], "OK"); 
                }

            }, 
            error => {
                console.log('error', error); 
            }
        );
  }

  //fonction generique pour afficher les alertes
  showAlert(mytitle,mysubTitle,mybuttons) {
       let alert = this.alertController.create({
           title: mytitle,
           subTitle: mysubTitle,
           buttons: [mybuttons]
       });
       alert.present();
   }

      //fonction generique pour afficher le LoadingController
   showLoading(){
     let loading = this.loadingController.create({
         content: " ",
         duration: 1000
      });
      loading.present();
   }


}
