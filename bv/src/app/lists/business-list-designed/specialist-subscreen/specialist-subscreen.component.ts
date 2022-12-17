import {Component, Inject, OnInit} from '@angular/core';
import {CookieObserverService} from '../../../services/cookieObserver/cookie-observer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguageServiceService} from '../../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/api/requests.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-specialist-subscreen',
  templateUrl: './specialist-subscreen.component.html',
  styleUrls: ['./specialist-subscreen.component.css']
})
export class SpecialistSubscreenComponent implements OnInit {

  type;
  chosenSpecialist = new ReplaySubject(1);

  specialist = null;

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    pointsystem: new FormControl('select'),
  });

  constructor(
    public dialogRef: MatDialogRef<SpecialistSubscreenComponent>,
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
    if (this.data.specialist) {
      this.id.setValue(this.data.specialist.id);
      this.name.setValue(this.data.specialist.name);
      this.pointsystem.setValue(this.data.specialist.pointsystem);
    }
    this.type = this.data.type;
    this.chosenSpecialist.subscribe(specialist => {
      this.specialist = specialist;
// @ts-ignore
      this.id.setValue(specialist.id);
    });

  }
  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get pointsystem() {
    return this.form.get('pointsystem');
  }
  close(): void {
    this.dialogRef.close();
  }
  removeSpecialist() {
    this.specialist = null;
    this.id.setValue(0);
  }

  getRowNameSpecialists = x => {
    return x.name;
  }
}
