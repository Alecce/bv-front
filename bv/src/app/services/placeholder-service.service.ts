import {Injectable} from '@angular/core';
import {RequestsService} from './api/requests.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderServiceService {

  placeholders = [];

  cardNoImage = '../../../assets/icons/placeholder-wine.svg';

  constructor(
    private service: RequestsService
  ) {
    this.service.getPlaceholderImages(null).subscribe((res => {
// @ts-ignore
      this.placeholders = res;
    }));
  }

  public getImagePlaceholder(wine, imageType) {
    // console.log(this.placeholders);

    let placeholder = null;

    this.placeholders.forEach(pl => {
      if (!placeholder) {
        if (this.compareColor(pl, wine) && this.compareType(pl, wine)  && this.compareImageType(pl, imageType)) {
          placeholder = environment.placeholderImageStore + `${pl.id + '_' + pl.image}.png`;
        }
      }
    })
    if (placeholder) {
      return placeholder;
    } else {
      return this.cardNoImage;
    }
  }

  compareColor(pl, wine) {
    if (wine.hasOwnProperty('wine_color')) {

      return pl.color == 'any' || pl.color == wine.wine_color || (pl.color == 'nocolor' && !wine.wine_color);
    } else {

      return pl.color == 'any' || pl.color == wine.color || (pl.color == 'nocolor' && !wine.color);
    }
  }

  compareType(pl, wine) {
    return pl.type == 'any' || pl.type == wine.grand_type || (pl.type == 'select' && !wine.grand_type);
  }

  compareImageType(pl, imageType) {
    return pl.image_type == 'any' || pl.image_type == imageType;
  }
}
