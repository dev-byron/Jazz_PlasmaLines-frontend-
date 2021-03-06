import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlasmaLineConfig } from '../../models/plasma-line.model';

@Injectable()
export class ImagestService {
  //change this to config file
  url = 'https://jazz-lines.s3.amazonaws.com/';

  constructor() { }


  getIcon(sportName: string) {
    const folderName= "icons/";
    /*
    CBB      COLLEGE BASKETBALL
    CFB      COLLEGE FOOTBALL
    ESOC     EUROPEAN SOCCER
    ESPRT    E-SPORTS
    MLB      ML BASEBALL
    MU       MATCHUPS
    NBA      NBA BASKETBALL
    NFL      NFL FOOTBALL
    NHL      NHL HOCKEY
    PROP     PROPOSITIONS
    RAC      RACING
    RBL      RAPID BET
    SOC      SOCCER
    TNT      TOURNAMENTS
    */
    switch (sportName) {
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
      case "": 
      return this.url + folderName + "";
    }
  }
  

}
