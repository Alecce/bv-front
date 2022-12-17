import {Component, Input, OnInit} from '@angular/core';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {Subject} from 'rxjs';
import {environment} from '@src/environments/environment';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';

@Component({
  selector: 'app-person-one-row',
  templateUrl: './person-one-row.component.html',
  styleUrls: ['./person-one-row.component.css']
})
export class PersonOneRowComponent implements OnInit {

  @Input() userIdSubject: Subject<any>;
  @Input() userId;

  user = null;
  id = null;

  LANGUAGE_CURRENT_PAGE = 'person_one_row';

  constructor(
    public downloadService: DownloadDataServiceService,
    public imagePlaceholder: PlaceholderServiceService,
    ) { }

  ngOnInit(): void {
    if(this.userIdSubject) {

      this.userIdSubject.subscribe(value => {
        this.loadUser(value);
        this.id = value;
      });
    }
    if(this.userId) {

      this.loadUser(this.userId);
      this.id = this.userId;
    }
  }

  loadUser(value) {

    this.downloadService.getPersonById(value).subscribe(res => {
      if(res) {

        this.user = res;
      } else {

        this.user = null;
        this.id = null;
      }
    });

  }

  getImage(row) {
    if (row.has_image) {
      return environment.userImageStore + `${row.id + '_' + row.has_image}.png`;

    } else {
      return this.imagePlaceholder.getImagePlaceholder(row, 'card');
    }
  }

}
