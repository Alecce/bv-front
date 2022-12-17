import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {RequestsService} from '../../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-image-subtable',
  templateUrl: './image-subtable.component.html',
  styleUrls: ['./image-subtable.component.css']
})
export class ImageSubtableComponent implements OnInit {

  id = 0;
  public tab = 'image';
  routeData = {editable: true};
  fileToUpload: File = null;
  url: string;
  currentImage = '';
  host = environment.storage;
  noImage = '../../../assets/images/no-image.png';
  isImageChanged = false;
  newImage = null;
  old;

  // @Input() parentData: string;
  // // @ts-ignore
  // @Input() downloadedData: Subject;


  form = new FormGroup({
    image: new FormControl(''),
    deleteOldOne: new FormControl(0),
  });
  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<ImageSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
    this.downloadedData.subscribe(data => {
      this.old = data.old;
      this.id = data.id;
      this.isImageChanged = data.isChanged;
      console.log(data);
      if (data.old) {
        this.currentImage = data.storage + data.id + '_' + data.old + `.png`;
      } else {
        this.currentImage = this.noImage;
      }

      if (data.new) {

        this.newImage = data.new;
        this.showImage(this.newImage);
        // this.isImageChanged = true;
      }
    });
    // this.currentImage = environment.wineImageStore + `${this.activatedroute.snapshot.params.id}.png`;
  }

  get deleteOldOne() {
    return this.form.get('deleteOldOne');
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      // var reader = new FileReader();

      // reader.readAsDataURL(event.target.files[0]); // read file as data url
      //
      // reader.onload = (event) => { // called once readAsDataURL is completed
      //   // @ts-ignore
      //   this.url = event.target.result;
      // }
      this.fileToUpload = event.target.files.item(0);
      this.newImage = this.fileToUpload;
      this.showImage(this.newImage);
    }
  }
  showImage(file) {

    const reader = new FileReader();

    reader.readAsDataURL(file); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      // @ts-ignore
      this.url = event.target.result;
    };

    this.isImageChanged = true;
  }
  deleteImage() {
    this.deleteOldOne.setValue(1);
    this.currentImage = this.noImage;
    this.fileToUpload = null;
    this.isImageChanged = true;
    this.newImage = null;
    this.url = null;
  }


  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const res = {
      old: this.old,
      new: this.newImage,
      id: this.id,
      isChanged: this.isImageChanged
    };
    return res;
  }
}
