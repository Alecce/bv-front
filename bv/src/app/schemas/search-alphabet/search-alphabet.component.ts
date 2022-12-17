import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-alphabet',
  templateUrl: './search-alphabet.component.html',
  styleUrls: ['./search-alphabet.component.css']
})
export class SearchAlphabetComponent implements OnInit {

  LETTERS = [
    'All',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];
  constructor() { }

  ngOnInit() {
  }

}
