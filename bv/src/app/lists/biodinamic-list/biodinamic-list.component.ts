import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-bodydinamic-list',
  templateUrl: './biodinamic-list.component.html',
  styleUrls: ['./biodinamic-list.component.css']
})
export class BiodinamicListComponent implements OnInit {

  total = 0;
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'admin/biodinamic/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.biodynamicImageStore}
  ];
  api = 'getBiodinamicList';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {

    let title = 'Biodynamiclist - bonvino.com';
    this.titleService.setTitle(title);
  }

}
