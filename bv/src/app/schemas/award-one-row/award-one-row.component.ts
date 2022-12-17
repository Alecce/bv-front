import {Component, Input, OnInit} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {ListsService} from '@src/app/services/api/lists.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '@src/environments/environment';

@Component({
  selector: 'app-award-one-row',
  templateUrl: './award-one-row.component.html',
  styleUrls: ['./award-one-row.component.css']
})
export class AwardOneRowComponent implements OnInit {

  award = null;

  noImage = '../../../assets/icons/placeholder-wine.svg';

  @Input() awardIdFormControl: FormControl;

  @Input() awardIdValue;
  @Input() noCategory;

  constructor(
    public downloadService: DownloadDataServiceService,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    public imagePlaceholder: PlaceholderServiceService,
    public listService: ListsService,
    private route: Router
  ) { }

  ngOnInit(): void {

    if(this.awardIdValue) {
      this.downloadService.getAwardById(this.awardIdValue).subscribe(c => {
        this.award = c;
      });
    }

    if(this.awardIdFormControl) {

      this.downloadService.getAwardById(this.awardIdFormControl.value).subscribe(c => {
        this.award = c;
      });

      this.awardIdFormControl.valueChanges.subscribe(v => {

        this.downloadService.getAwardById(v).subscribe(c => {
          this.award = c;
        });
      })
    }

  }

  getImage() {
    if (this.award && this.award.image) {
      return environment.awardImageStore + `${this.award.id + '_' + this.award.image}.png`;

    } else {
      // return this.imagePlaceholder.getImagePlaceholder(this.wineData.basic_designed, 'page');
      return this.noImage;
    }
  }

  getName(award) {
    if (award) {
      if (award.name && award.name_int) {
        return `${award.name} (${award.name_int})`;
      } else if (award.name) {
        return `${award.name}`;
      } else if (award.name_int) {
        return `${award.name_int}`;
      }

    }
  }
  // categories_name: "11"
  // categories_name_int: "22"
  getCategoryName(award) {
    if (award && (award.categories_name || award.categories_name_int || award.categories_name_int)) {
      let res = '';
      if (award.categories_name && award.categories_name_int) {
        res = res + `${award.categories_name} (${award.categories_name_int})`;
      } else if (award.categories_name) {
        res = res + `${award.categories_name}`;
      } else if (award.categories_name_int) {
        res = res + `${award.categories_name_int}`;
      }

      if(award.categories_year) {
        res = res + ` - ${award.categories_year}`;
      }

      return res;
    }
  }
}
