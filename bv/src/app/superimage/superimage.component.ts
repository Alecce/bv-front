import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../services/api/requests.service';
import {LanguageServiceService} from '../services/language-service.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-superimage',
  templateUrl: './superimage.component.html',
  styleUrls: ['./superimage.component.css']
})
export class SuperimageComponent implements OnInit {
  routeData = {editable: true};
  fileToUpload: File = null;
  url: string;
  currentImage = '';
  host = environment.directoryImageStore;
  noImage = '../../../assets/images/no-image.png';
  isImageChanged = false;

  // @Input() parentData: string;
  // @ts-ignore
  // @Input() downloadedData: Subject;
  @Input() storage;
  // @ts-ignore
  @Input() downloadedData: Subject;



  form = new FormGroup({
    image: new FormControl(''),
    deleteOldOne: new FormControl(0),

  });
  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService) { }

  ngOnInit() {


    this.downloadedData.subscribe(data => {
      console.log(data);
      if (data.picture) {
        this.currentImage = this.host + `${this.storage}/${this.activatedroute.snapshot.params.id + '_' + data.picture}.png`;
      } else {
        this.currentImage = this.noImage;
      }
    });
  }

  get deleteOldOne() {
    return this.form.get('deleteOldOne');
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);
      this.isImageChanged = true;
    }
  }
  getNewImage() {
    return this.fileToUpload;
  }
  deleteImage() {
    this.deleteOldOne.setValue(1);
    this.currentImage = this.noImage;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }
}
