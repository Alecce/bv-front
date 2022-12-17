import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-quality-list',
  templateUrl: './quality-list.component.html',
  styleUrls: ['./quality-list.component.css']
})
export class QualityListComponent implements OnInit {

  STORAGE = 'qualities';
  path = environment.directoryImageStore;
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'admin/quality/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Quality', link: false, href: '', hrefId: '', searchFormControlName: 'searchName',
      translateGroup: 'quality_names', translateId: 'id'},
    {variable: 'year', name: 'Year', link: false, href: '', hrefId: '', searchFormControlName: 'searchYear'},
    {variable: 'region', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchRegiones'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry',
      translateGroup: 'country_names', translateId: 'country'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.qualityImageStore}
  ];
  api = 'getQualityList';
  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {

    let title = 'QualityList - bonvino.com';
    this.titleService.setTitle(title);
  }
}
