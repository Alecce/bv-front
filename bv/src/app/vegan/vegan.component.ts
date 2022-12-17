import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../services/api/requests.service';
import {LanguageServiceService} from '../services/language-service.service';
import {SuperimageComponent} from '../superimage/superimage.component';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-vegan',
  templateUrl: './vegan.component.html',
  styleUrls: ['./vegan.component.css']
})
export class VeganComponent implements OnInit {
  routeData = {editable: false, download: false, available: true};
  id = this.activatedroute.snapshot.params.id;
  downloadedData = new ReplaySubject(10);

  form = new FormGroup({
    name: new FormControl(''),
    picture: new FormControl('')
  });

  STORAGE = 'vegan';

  // @ts-ignore
  @ViewChild(SuperimageComponent) image: SuperimageComponent;

  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService) { }

  ngOnInit() {
    this.routeData.download = this.activatedroute.snapshot.data.download;
    this.routeData.editable = this.activatedroute.snapshot.data.editable;

    this.activatedroute.data.subscribe(data => {
      console.log(this.activatedroute.snapshot.data.download);

      if (data.download) {
        this.service.getVegan(this.id).subscribe(response => {
          this.downloadedData.next(response);
          // console.log(response);
          Object.keys(this.form.controls).forEach(key => {
            if (response.hasOwnProperty(key)) {
              this.form.get(key).setValue(response[key]);
            }
          });
          const regionChain = [];
          if (response.hasOwnProperty('regionId')) {
// @ts-ignore
            let region = response.regionId;
            while (region) {
              regionChain.push(region);
// @ts-ignore
              region = this.regiones.filter(r => r.closest_parent_id == region.id)[0];
            }
          }

          if (!this.activatedroute.snapshot.data.editable) {
            this.routeData.editable = false;
            this.form.disable();
          }
        });
      }
    });
    // this.address_invisible.setValue(this.address_invisible.value ? 1 : 0);
    // this.name_invisible.setValue(this.name_invisible.value ? 1 : 0);
  }
  get type() {
    return this.form.get('type');
  }
  get business_name() {
    return this.form.get('business_name');
  }
  get email() {
    return this.form.get('email');
  }
  get passwords() {
    return this.form.get('passwords');
  }
  get password() {
    return this.form.get('passwords').get('password');
  }
  get password_confirmation() {
    return this.form.get('passwords').get('password_confirmation');
  }
  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get name_invisible() {
    return this.form.get('name_invisible');
  }
  get username() {
    return this.form.get('username');
  }
  get birthday() {
    return this.form.get('birthday');
  }
  get sex() {
    return this.form.get('sex');
  }
  get country_id() {
    return this.form.get('country_id');
  }
  get region(): FormArray  {
    return (this.form.get('region') as FormArray);
  }
  get address() {
    return this.form.get('address');
  }
  get picture() {
    return this.form.get('picture');
  }

  getCookieData() {
    return {
      myId: this.cookieService.get('myId'),
      passwordHash: this.cookieService.get('hash')
    };
  }

  edit() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/admin/vegan-edit/' + this.activatedroute.snapshot.params.id]);
  }
  delete() {
    if (this.langService.editable) {
      return;
    }
    this.service.deleteVegan(this.activatedroute.snapshot.params.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  returnBack() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/admin/vegan/' + this.activatedroute.snapshot.params.id]);
  }
  submit() {
    if (this.langService.editable) {
      return;
    }
    if (this.image.getNewImage()) {
      this.picture.setValue(true);
    }
    let observer;
    if (!this.activatedroute.snapshot.data.download) {
      observer = this.service.addVegan(this.form.value);
    } else {
      observer = this.service.editVegan(this.form.value, this.id);
    }
    observer.subscribe(data => {
      if (this.image.isImageChanged) {
        this.service.setImage(this.STORAGE, data.id, this.image.getNewImage()).subscribe(() => {

          this.router.navigate(['/admin/vegan/' + data.id]);
        });
      } else {
        this.router.navigate(['/admin/vegan/' + data.id]);
      }
    });

  }

}
