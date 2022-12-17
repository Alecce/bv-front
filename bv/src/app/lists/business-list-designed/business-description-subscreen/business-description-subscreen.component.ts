import {Component, Inject, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/api/requests.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '../../../services/cookieObserver/cookie-observer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-business-description-subscreen',
  templateUrl: './business-description-subscreen.component.html',
  styleUrls: ['./business-description-subscreen.component.css']
})
export class BusinessDescriptionSubscreenComponent implements OnInit {

  // type;

  business = null;
  businessTypeList = [];

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    type: new FormControl('select'),
  });

  constructor(
    public dialogRef: MatDialogRef<BusinessDescriptionSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // @Inject(MAT_DIALOG_DATA) public type,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.business) {
      this.id.setValue(this.data.business.id);
      this.name.setValue(this.data.business.name);
      this.type.setValue(this.data.business.type);
    }

    this.service.getConstructorPages().subscribe(data => {
      console.log(data);
// @ts-ignore
      data.res.forEach(row => {
        if (row.parentpage == 'business') {
          this.businessTypeList.push(row);
        }
// @ts-ignore
//         this.lists.address.push({id: row.id, name: row.name});
      });
    });


  }
  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get type() {
    return this.form.get('type');
  }
  close(): void {
    this.dialogRef.close();
  }

  getLink() {
    return 'business-edit/' + this.type.value + '/' + this.id.value;
  }
}
