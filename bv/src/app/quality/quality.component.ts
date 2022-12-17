import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../services/api/requests.service';
import {LanguageServiceService} from '../services/language-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuperimageComponent} from '../superimage/superimage.component';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
  routeData = {editable: false, download: false, available: true};
  passwordPatternValidator = Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
  id = this.activatedroute.snapshot.params.id;
  downloadedData = new ReplaySubject(10);

  form = new FormGroup({
    name: new FormControl(''),
    years: new FormControl(''),
    picture: new FormControl(''),
    country_id: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),
  });

  STORAGE = 'qualities';

  // @ts-ignore
  @ViewChild(SuperimageComponent) image: SuperimageComponent;
  countries = [];
  // regiones = [];
  regionesLevels = [[], [], [], [], []];


  regiones = [];
  allRegiones = [];

  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService) { }

  ngOnInit() {
    this.routeData.download = this.activatedroute.snapshot.data.download;
    this.routeData.editable = this.activatedroute.snapshot.data.editable;
    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      console.log(data);
      this.country_id.valueChanges.subscribe(() => {
        this.clearNext(0);
        this.filterRegiones();
      });
      for (let i = 0; i < 6; i++) {
        this.regionsForm.controls[i].valueChanges.subscribe(() => {

          this.clearNext(i + 1);
          this.filterRegiones();
        });
      }

      this.service.getRegiones().subscribe(data => {
// @ts-ignore
        this.regiones = data;
        this.filterRegiones();

        this.activatedroute.data.subscribe(data => {
          console.log(this.activatedroute.snapshot.data.download);

          if (data.download) {
            this.service.getQuality(this.id).subscribe(response => {
              this.downloadedData.next(response);

              if (!this.activatedroute.snapshot.data.editable) {
                this.routeData.editable = false;
                this.form.disable();
              }
              console.log(response);
              Object.keys(this.form.controls).forEach(key => {
                if (response.hasOwnProperty(key) && this.form.get(key) instanceof FormControl) {
                  this.form.get(key).setValue(response[key]);
                }
              });

// @ts-ignore
              if (response.regions) {
                // this.regionsForm.setValue(downloadData.geolocation.regions);
                for (let i = 0; i < 6; i++) {
// @ts-ignore
                  this.regionsForm.controls[i].setValue(response.regions[i]);
                }
              }

//           const regionChain = [];
//           if (response.hasOwnProperty('regionId')) {
// // @ts-ignore
//             let region = response.regionId;
//             while (region) {
//               regionChain.push(region);
//               region = this.regiones.filter(r => r.closest_parent_id == region.id)[0];
//             }
//           }

            });
          }
        });
      });
    });

//     this.service.getRegiones().subscribe(data => {
// // @ts-ignore
//       this.regiones = data;
//       // console.log(data);
//       // this.refreshLevel(0);
//
//       // this.country_id.valueChanges.subscribe((val) => {
//       //   // console.log(this.country.value);
//       //   // this.refreshLevel(0, val);
//       // });
//       // for (let i = 0; i < this.regionesLevels.length; i++) {
//       //   // console.log(this.region.at(i).value);
//       //   // (this.region.at(i) as FormControl).valueChanges.subscribe((val) => {
//       //   //   // console.log(val);
//       //   //   // this.refreshLevel(i + 1, val);
//       //   // });
//       // }
//       // .forEach(rl => {
//       //   this.refreshLevel()
//       // })
//
//       // this.region.valueChanges.subscribe(() => {
//       //   // this.refreshLevel(0);
//       //
//       // });
//     });


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
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
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
  submit() {
    if (this.langService.editable) {
      return;
    }
    if (this.image.getNewImage()) {
        this.picture.setValue(true);
    }
    let observer;
    if (!this.activatedroute.snapshot.data.download) {
      observer = this.service.addQuality(this.form.value);
    } else {
      observer = this.service.editQuality(this.form.value, this.id);
    }
    observer.subscribe(data => {
      if (this.image.isImageChanged) {
        this.service.setImage(this.STORAGE, data.id, this.image.getNewImage()).subscribe(() => {

          this.router.navigate(['/admin/quality/' + data.id]);
        });
      } else {
        // this.router.navigate(['/quality/' + data.id]);
      }
    });

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
    this.router.navigate(['/admin/quality-edit/' + this.activatedroute.snapshot.params.id]);
  }
  delete() {
    if (this.langService.editable) {
      return;
    }
    this.service.deleteQuality(this.activatedroute.snapshot.params.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  returnBack() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/admin/quality/' + this.activatedroute.snapshot.params.id]);
  }

  filterRegiones() {
    console.log((this.regionsForm as FormArray).value);
    this.allRegiones[0] = [];
    this.allRegiones[0] = this.regiones.filter(region => {
      return region.parent == this.country_id.value;
    });
    for (let i = 1; i < 6; i++) {
      this.allRegiones[i] = [];
      this.allRegiones[i] = this.regiones.filter(region => {
        return region.parent == (this.regionsForm as FormArray).at(i - 1).value;
      });
    }
  }
  clearNext(level) {
    if (level < 6) {
      this.regionsForm.at(level).setValue(0);
    }
  }
}
