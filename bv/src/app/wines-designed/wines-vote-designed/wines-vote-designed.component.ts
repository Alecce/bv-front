import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {Overlay} from '@angular/cdk/overlay';
import {ListsService} from '../../services/api/lists.service';
import {ActivatedRoute} from '@angular/router';
import {LanguageServiceService} from '../../services/language-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wines-vote-designed',
  templateUrl: './wines-vote-designed.component.html',
  styleUrls: ['./wines-vote-designed.component.css']
})
export class WinesVoteDesignedComponent implements OnInit {

  tab = 'vote';
  currentRateStars = 2;
  currentRateHearts = 2;
  threeCols = ['1', '2', '3'];

  systemToShow;
  // result = 0;

  system20 = [
    {
      part: 'Appearance',
      selects: [
        {
          criteria: 'Clarity',
          options: [
            {name: 'Brilliant, bright, crystal, leggy', cost: 1},
            {name: 'Translucent, slightly dull, pearling', cost: 0.5},
            {name: 'Cloudy, hazy, sediment, watery', cost: 0}
          ],
          colNumber: '1'
        },
        {
          criteria: 'Color',
          options: [
            {name: 'Vivid, typical for type and age', cost: 1},
            {name: 'Nearly correct, attractive, gold edge', cost: 0.5},
            {name: 'Off, maderized, brown, colorless', cost: 0}
          ],
          colNumber: '2'
        },
        {
          criteria: 'Aroma',
          options: [
            {name: 'Lively, dense fruit, complex, flowery', cost: 4},
            {name: 'Fruity, pronounced, developed', cost: 3},
            {name: 'Clean, pleasant, mildly scented, delicate', cost: 2},
            {name: 'Fleeting, simple, undeveloped, elusive', cost: 1},
            {name: 'Defective, off, sulfurous, vinegary', cost: 0}
          ],
          colNumber: '1'
        },
      ]
    },
    {
      part: 'Balance',
      selects: [
        {
          criteria: 'Sweetness',
          options: [
            {name: 'Appropriate to type, balanced, normal', cost: 1},
            {name: 'Sweet edged, slightly lacking', cost: 0.5},
            {name: 'Cloying, syrupy, sugary, lacking', cost: 0},
          ],
          colNumber: '3'
        },
        {
          criteria: 'Acidity',
          options: [
            {name: 'Balanced, appropriate to type', cost: 1},
            {name: 'Slightly low or high, slightly tart', cost: 0.5},
            {name: 'Flabby, insipid, raw, harsh, vinegary', cost: 0},
          ],
          colNumber: '1'
        },
        {
          criteria: 'Bitterness/Astringency',
          options: [
            {name: 'Balanced, normal, appropriate for age', cost: 1},
            {name: 'Citric, slightly bitter, medium', cost: 0.5},
            {name: 'Bitter, harsh, withered', cost: 0},
          ],
          colNumber: '2'
        },
      ]
    },
    {
      part: '',
      selects: [
        {
          criteria: 'Body/Texture',
          options: [
            {name: 'Appropriate depth, firm, velvety, silky', cost: 2},
            {name: 'Nearly correct, smooth, even', cost: 1.5},
            {name: 'Slightly thin, heavy', cost: 1},
            {name: 'Uneven, awkward, coarse', cost: 0.5},
            {name: 'Empty, thin, rough, clumsy', cost: 0},
          ],
          colNumber: '2'
        },
        {
          criteria: 'Taste/Flavor',
          options: [
            {name: 'Complex, mature, luscious', cost: 4},
            {name: 'Fruity, robust, multilayered', cost: 3},
            {name: 'Agreeable, clean, simple', cost: 2},
            {name: 'Lacking, green, underripe', cost: 1},
            {name: 'Chemical, stemmy, hollow', cost: 0},
          ],
          colNumber: '3'
        },
        {
          criteria: 'Finish',
          options: [
            {name: 'Appropriate for age, enticing, lingering', cost: 2},
            {name: 'Tapering, fades moderately quickly', cost: 1},
            {name: 'Harsh, withered, no finish or fades quickly', cost: 0},
          ],
          colNumber: '3'
        },
        {
          criteria: 'Overall Quality',
          options: [
            {name: 'Noble, distinguished, elegant, grand', cost: 3},
            {name: 'Solid character, skillfully made', cost: 2},
            {name: 'No exceptional features, average', cost: 1},
            {name: 'Flawed', cost: 0},
          ],
          colNumber: '1'
        },
      ]
    },
  ];

  system100 = [
    {
      part: 'Aspect',
      selects: [
        {
          criteria: 'Limpidty',
          options: [
            {name: 'Excellent', cost: 5},
            {name: 'Very good', cost: 4},
            {name: 'Good', cost: 3},
            {name: 'Fair', cost: 2},
            {name: 'Unsatisfactory', cost: 1},
          ]
        },
        {
          criteria: 'Colour',
          options: [
            {name: 'Excellent', cost: 10},
            {name: 'Very good', cost: 8},
            {name: 'Good', cost: 6},
            {name: 'Fair', cost: 4},
            {name: 'Unsatisfactory', cost: 2},
          ]
        },
      ]
    },

    {
      part: 'Bouquet',
      selects: [
        {
          criteria: 'Intensity',
          options: [
            {name: 'Excellent', cost: 8},
            {name: 'Very good', cost: 7},
            {name: 'Good', cost: 6},
            {name: 'Fair', cost: 4},
            {name: 'Unsatisfactory', cost: 2},
          ]
        },
        {
          criteria: 'Genuineness',
          options: [
            {name: 'Excellent', cost: 6},
            {name: 'Very good', cost: 5},
            {name: 'Good', cost: 4},
            {name: 'Fair', cost: 3},
            {name: 'Unsatisfactory', cost: 2},
          ]
        },
        {
          criteria: 'Quality',
          options: [
            {name: 'Excellent', cost: 16},
            {name: 'Very good', cost: 14},
            {name: 'Good', cost: 12},
            {name: 'Fair', cost: 10},
            {name: 'Unsatisfactory', cost: 8},
          ]
        },
      ]
    },

    {
      part: 'Taste',
      selects: [
        {
          criteria: 'Intensity',
          options: [
            {name: 'Excellent', cost: 8},
            {name: 'Very good', cost: 7},
            {name: 'Good', cost: 6},
            {name: 'Fair', cost: 4},
            {name: 'Unsatisfactory', cost: 2},
          ]
        },
        {
          criteria: 'Genuineness',
          options: [
            {name: 'Excellent', cost: 6},
            {name: 'Very good', cost: 5},
            {name: 'Good', cost: 4},
            {name: 'Fair', cost: 3},
            {name: 'Unsatisfactory', cost: 2},
          ]
        },
        {
          criteria: 'Quality',
          options: [
            {name: 'Excellent', cost: 22},
            {name: 'Very good', cost: 19},
            {name: 'Good', cost: 16},
            {name: 'Fair', cost: 13},
            {name: 'Unsatisfactory', cost: 10},
          ]
        },
        {
          criteria: 'Persistence',
          options: [
            {name: 'Excellent', cost: 8},
            {name: 'Very good', cost: 7},
            {name: 'Good', cost: 6},
            {name: 'Fair', cost: 5},
            {name: 'Unsatisfactory', cost: 4},
          ]
        },
      ]
    },

    {
      part: 'Overall',
      selects: [
        {
          criteria: '',
          options: [
            {name: 'Excellent', cost: 11},
            {name: 'Very good', cost: 10},
            {name: 'Good', cost: 9},
            {name: 'Fair', cost: 8},
            {name: 'Unsatisfactory', cost: 7},
          ]
        },
      ]
    },
  ];

  systemStars = [
    {
      part: '',
      selects: [
        {
          criteria: 'stars',
          options: [
            {name: '', cost: 1},
            {name: '', cost: 2},
            {name: '', cost: 3},
            {name: '', cost: 4},
            {name: '', cost: 5},
          ]
        },
      ]
    },
  ];

  systemHearts = [
    {
      part: '',
      selects: [
        {
          criteria: 'hearts',
          options: [
            {name: '', cost: 1},
            {name: '', cost: 2},
            {name: '', cost: 3},
            {name: '', cost: 4},
            {name: '', cost: 5},
          ]
        },
      ]
    },
  ];

  noSystem = [];

  systems = [
    // {
    //   name: 'No vote', value: 'system0',
    // },
    {
      name: 'Satisfaction', value: 'system5',
    },
    {
      name: 'Quality', value: 'system5_2',
    },
    {
      name: '100 grades', value: 'system100',
    },
    {
      name: '20 grades', value: 'system20',
    },
  ];

  systemsFull = {
    // system0: this.noSystem,
    system100: this.system100,
    system20: this.system20,
    system5: this.systemHearts,
    system5_2: this.systemStars,
  };


  form = new FormGroup({
    system: new FormControl(this.systems[0].value),
    score: new FormControl(''),
    full: new FormGroup({})
  });


  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public overlay: Overlay,
              config: NgbRatingConfig) {
                config.max = 5;
              }

  ngOnInit() {
    this.choseSystem(this.systems[0].value);
  }
  get system() {
    return this.form.get('system');
  }

  get fullData() {
    return this.form.get('full');
  }

  get score() {
    return this.form.get('score');
  }
  getFormGroup(system) {
    // console.log(system);
    const newForm = new FormGroup({}, [Validators.required]);
    system.forEach(part => {
      part.selects.forEach(criteria => {
        newForm.addControl(part.part + '_' + criteria.criteria, new FormControl('', [Validators.required]));
      });
    })
    return newForm;
  }

  get result() {
    // console.log(this.form.valid);

    let res = 0;
    for (const v in this.fullData.value) {
      res += this.fullData.value[v] * 1;
    }
    // console.log(res);
    this.score.setValue(res);
    return res;
  }

  refreshResult() {
    let res = 0;
    for (const v in this.fullData.value) {
      res += this.fullData.value[v] * 1;
    }
    // console.log(res);
    this.score.setValue(res);
  }
  starRate() {
    if (this.langService.editable) {
      return;
    }
    console.log(this.form.value);
    // this.score.setValue(rating);
    // @ts-ignore


    if (this.system.value === 'system5') {
      // @ts-ignore
      // this.score.setValue(this.currentRateStars);
      this.fullData.get('_hearts').setValue(this.currentRateHearts);
    }
    if (this.system.value === 'system5_2') {
      // @ts-ignore
      // this.score.setValue(this.currentRateHearts);
      this.fullData.get('_stars').setValue(this.currentRateStars);
    }
    this.refreshResult();
    // console.log(this.result);
  }

  submit() {
    if (this.langService.editable) {
      return;
    }
    // console.log('111');
    console.log(this.form.value);
    return;
    if (this.system.value === 'system0') {

    }
    if (this.system.value === 'system5') {
      // @ts-ignore
      this.score.setValue(this.currentRateStars);
    }
    if (this.system.value === 'system5_2') {
      // @ts-ignore
      this.score.setValue(this.currentRateHearts);
    }
    const myId = this.cookieService.get('myId');
    const hash = this.cookieService.get('hash');
    const formsData = {
      form: this.form.value,
      wine: this.activatedroute.snapshot.params.id,
      confirmation: {myId, hash}
    };

    console.log(formsData);
    this.service.voteForWine(formsData).subscribe(() => {
      // console.log('qwerty');
      this.getPreviousOpinion();
    });
  }

  getPreviousOpinion() {
    const myId = this.cookieService.get('myId');
    const hash = this.cookieService.get('hash');
    const formsData = {
      wine: this.activatedroute.snapshot.params.id,
      confirmation: {myId, hash}
    };
    // this.service.getMyVote(formsData).subscribe(voteData => {
    //   // @ts-ignore
    //   this.previousVote = voteData.points;
    //   this.systems.forEach(x => {
    //     // @ts-ignore
    //     if (voteData.system == x.value) {
    //
    //       // @ts-ignore
    //       this.previousSystem = x.name;
    //     }
    //   });
    //   // @ts-ignore
    //   this.previousText = `${this.previousVote} (${this.previousSystem})`;
    // });
  }

  getTabColor(tab) {
    return 'btn-info';
    // if (this.chosenTab == tab) {
    //   return 'btn-secondary';
    // } else {
    //   return 'btn-info';
    // }
  }

  choseSystem(x) {
    // console.log(s);
    this.system.setValue(x);
    this.form.removeControl('full');
    this.form.addControl('full', this.getFormGroup(this.systemsFull[x]));
    // console.log(this.form.value);
    this.systemToShow = this.systemsFull[x];
  }
}
