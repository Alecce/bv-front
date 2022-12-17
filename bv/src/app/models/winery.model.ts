export class WinerySendData {

  additional: any;
  biodynamics: BiodynamicData[];
  commoninfo: WinerySendCommonInfoData;
  grapeSynonims: any[];
  grapelist: any[];
  kashrut: any[];
  menu: any;
  organic: any[];
  quality: any[];
  vegan: any[];
  vineyardlist: any[];
  visittime: any;
  wineryId: any;

}





export class WineryGetData {
  additional: any;
  biodynamics: BiodynamicData[];
  commoninfo: WineryCommonInfoData;
  countryName: any;
  emblem: any;
  geolocation: GeolocationData;
  regions: any[];
  grapeSynonims: any[];
  grapelist: any[];
  grapesFull: any[];
  image: any;
  kashruts: KashrutData[];
  menu: any;
  organics: OrganicData[];
  qualities: QualityData[];
  user: any;
  vegans: VeganData[];
  vineyardsFull: VineyardData[];
  visittime: any;
}

export class WineryCommonInfoData {
  address: any;
  country: any;
  email: any;
  establish_year: any;
  fax: any;
  id: any;
  isBiodynamic: any;
  isKashrut: any;
  isOrganic: any;
  isQuality: any;
  isVegan: any;
  language: any;
  lat: any;
  lng: any;
  mobile: any;
  name_international: any;
  name_national: any;
  owner: any;
  performance: any;
  phone: any;
  regionsForm: any[];
  web: any;
  winemaker_international: any;
  winemaker_national: any;
  zip: any;
}


export class GeolocationData {
  address: any;
  city: any;
  country: any;
  lat: any;
  lng: any;
}
export class KashrutData {
  id: any;
  international: any;
  hebrew: any;
}
export class OrganicData {
  id: any;
  name: any;
}
export class BiodynamicData {
  id: any;
  name: any;
}
export class QualityData {
  id: any;
  name: any;
}
export class VeganData {
  id: any;
  name: any;
}
export class VineyardData {
  id: any;
  name: any;
}


export class WinerySendCommonInfoData {

  address: any;
  country: any;
  email: any;
  establish_year: any;
  fax: any;
  id: any;
  isBiodynamic: any;
  isKashrut: any;
  isOrganic: any;
  isQuality: any;
  isVegan: any;
  language: any;
  lat: any;
  lng: any;
  mobile: any;
  name_international: any;
  name_national: any;
  owner: any;
  performance: any;
  userId: any;
  phone: any;
  regionsForm: any[];
  web: any;
  winemaker_international: any;
  winemaker_national: any;
  yours: any;
  zip: any;
}
