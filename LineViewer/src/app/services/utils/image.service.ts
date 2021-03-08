import { Injectable } from '@angular/core';

import { AppConfig } from '../../app.config';

@Injectable()
export class ImageService {

  protected iconsUrl = AppConfig.settings.imagesServerUrl + "/icons/"

  constructor() { }

  getIcon(sportName: string, title: string) {
    /*
    MU       MATCHUPS
    PROP     PROPOSITIONS
    TNT      TOURNAMENTS
    */
   console.log(sportName)
    switch (sportName.toUpperCase().trim()) {
      case "CBB":
      case "NBA": 
        return this.iconsUrl + "NBA.png";
      case "CFB":
      case "ESOC":
      case  "SOC": 
        return this.iconsUrl + "SOC.png";
      case "ESPRT": 
        return this.iconsUrl + "ESPOR.png";
      case "MLB": 
        return this.iconsUrl + "MLB.png";
      case "NFL": 
        return this.iconsUrl + "NFL.png";
      case "NHL": 
        return this.iconsUrl + "NHL.png";
      case "RAC": 
        return this.iconsUrl + "AUTO.png";
      case "RBL": 
        return this.iconsUrl + "OTHER.png";
      default:
        return this.iconsUrl + "other-leagues.png";
    }
  }
  

}
