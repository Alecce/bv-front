import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListsService} from '../../services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {AccountServiceService} from '../../services/account-service.service';

@Component({
  selector: 'app-wines-vote-subscreen',
  templateUrl: './wines-vote-subscreen.component.html',
  styleUrls: ['./wines-vote-subscreen.component.css']
})
export class WinesVoteSubscreenComponent implements OnInit {

  wineId = 0;
  LOCAL_STORAGE_MAXIMUM_IN_VOTING = 'bonvine_maximum_in_vote';
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
          colNumber: '3'
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
          colNumber: '1'
        },
        {
          criteria: 'Acidity',
          options: [
            {name: 'Balanced, appropriate to type', cost: 1},
            {name: 'Slightly low or high, slightly tart', cost: 0.5},
            {name: 'Flabby, insipid, raw, harsh, vinegary', cost: 0},
          ],
          colNumber: '2'
        },
        {
          criteria: 'Bitterness/Astringency',
          options: [
            {name: 'Balanced, normal, appropriate for age', cost: 1},
            {name: 'Citric, slightly bitter, medium', cost: 0.5},
            {name: 'Bitter, harsh, withered', cost: 0},
          ],
          colNumber: '3'
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
          colNumber: '1'
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
          colNumber: '2'
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

  systemAny = [
    {
      part: '',
      selects: [
        {
          criteria: 'result',
        },
        {
          criteria: 'maximum',
        },
      ]
    },
  ];

  noSystem = [];

  systems = [
    // {
    //   name: 'No vote', value: 'system0',
    // },
    // {
    //   name: 'Satisfaction', value: 'system5',
    // },
    {
      name: 'Quality', value: 'system5_2',
    },
    {
      name: '100 grades', value: 'system100',
    },
    {
      name: '20 grades', value: 'system20',
    },
    {
      name: 'Enter result', value: 'systemAny',
    },
  ];

  systemsFull = {
    // system0: this.noSystem,
    system100: this.system100,
    system20: this.system20,
    // system5: this.systemHearts,
    system5_2: this.systemStars,
    systemAny: this.systemAny,
  };


  form = new FormGroup({
    system: new FormControl(this.systems[0].value),
    score: new FormControl(''),
    full: new FormGroup({}),

    role: new FormControl(0),

    price: new FormControl(''),
  });

  cookies;
  idSpecialist = 0;
  previousVotes = [];

  roleList = [];
  roleLoading = true;
  me = {type: 'person', name: ''};

  constructor(
              private cookieObserver: CookieObserverService,
              public dialogRef: MatDialogRef<WinesVoteSubscreenComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public overlay: Overlay,
              public accountService: AccountServiceService,
              config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit() {
    this.cookies = this.cookieObserver.observeCookie();
    this.choseSystem(this.systems[0].value);

    this.data.subscribe(x => {
      console.log(x);
      this.wineId = x.id;
      this.getPreviousVotes();
    });

    this.accountService.currentRole.subscribe(role => {
      // @ts-ignore
      if (role.type == 'specialist') {
        // @ts-ignore
        this.idSpecialist = role.idBisness;
      }

      // @ts-ignore
      if (role.type == 'person') {
        // @ts-ignore
        this.idSpecialist = 0;
      }
    });



    this.accountService.roles.subscribe(x => {
// @ts-ignore
      this.roleList = x;
      this.form.get('role').valueChanges.subscribe(idOption => {
        const chosenRole = this.roleList.filter(role => {
          return role.idOption == idOption;
        })[0];
        this.accountService.currentRole.next(chosenRole);
      });
    });
    this.roleList.forEach(role => {
      if (role.type == 'specialist') {
        this.role.setValue(role.idOption);
      }
    });
  }

  getPreviousVotes() {
    this.service.getMyVote({idWine: this.wineId}).subscribe(votes => {
      console.log(votes);
      // @ts-ignore
      this.previousVotes = votes;
      let lastPrice = '';
      this.previousVotes.forEach(x => {
        if(!lastPrice || x.specialist) {
          lastPrice = x.price;
        }
      });
      this.price.setValue(lastPrice);
    });
  }
  get system() {
    return this.form.get('system');
  }

  get fullData() {
    return this.form.get('full');
  }
  get role() {
    return this.form.get('role');
  }

  get score() {
    return this.form.get('score');
  }
  get price() {
    return this.form.get('price');
  }
  getFormGroup(system) {
    // console.log(system);
    const newForm = new FormGroup({}, [Validators.required]);
    console.log(system);
    system.forEach(part => {
      part.selects.forEach(criteria => {
        newForm.addControl(part.part + '_' + criteria.criteria, new FormControl('', [Validators.required]));
      });
    });
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
  // starRate() {
  //   if (this.langService.editable) {
  //     return;
  //   }
  //   console.log(this.form.value);
  //   // this.score.setValue(rating);
  //   // @ts-ignore
  //
  //
  //   if (this.system.value === 'system5') {
  //     // @ts-ignore
  //     // this.score.setValue(this.currentRateStars);
  //     this.fullData.get('_hearts').setValue(this.currentRateHearts);
  //   }
  //   if (this.system.value === 'system5_2') {
  //     // @ts-ignore
  //     // this.score.setValue(this.currentRateHearts);
  //     this.fullData.get('_stars').setValue(this.currentRateStars);
  //   }
  //   this.refreshResult();
  //   // console.log(this.result);
  // }

  starRate(rate) {
    if (this.langService.editable) {
      return;
    }

    if (this.system.value === 'system5') {
      // @ts-ignore
      // this.score.setValue(this.currentRateStars);
      this.fullData.get('_hearts').setValue(rate);
    }
    if (this.system.value === 'system5_2') {
      // @ts-ignore
      // this.score.setValue(this.currentRateHearts);
      this.score.setValue(rate);
    }
  }

  rateChange(value) {
    console.log(value);
  }

  submit() {
    if (this.langService.editable) {
      return;
    }

    console.log(this.currentRateHearts);
    console.log(this.currentRateStars);

    let maxScore = 0;
    let score = 0;
    if (this.system.value === 'system0') {

    }
    if (this.system.value === 'system5') {
      maxScore = 5;
    }
    if (this.system.value === 'system5_2') {
      score = this.score.value;
      maxScore = 5;
    }
    if (this.system.value === 'systemAny') {
      // @ts-ignore
      this.score.setValue(this.form.get('full').get('_result').value);
      score = this.form.get('full').get('_result').value;
      maxScore = this.form.get('full').get('_maximum').value;
    }
    if (this.system.value === 'system100') {
      score = this.score.value;
      maxScore = 100;
    }
    if (this.system.value === 'system20') {
      score = this.score.value;
      maxScore = 20;
    }


    const voteData = {
      idUser: this.cookieService.get('myId'),
      score,
      price: this.price.value,
      idSpecialist: this.idSpecialist,
      idWine: this.wineId,
      maxScore
    };

    console.log(voteData);


    this.service.voteForWine(voteData).subscribe(() => {
      this.getPreviousVotes();
    });
  }


  clearVotes() {
    if (this.langService.editable) {
      return;
    }

    const voteData = {
      idUser: this.cookieService.get('myId'),
      score: 100,
      idSpecialist: this.idSpecialist,
      idWine: this.wineId,
      maxScore: 100,
      delete: true
    };

    console.log(voteData);


    this.service.voteForWine(voteData).subscribe(() => {
      this.getPreviousVotes();
    });
  }

  getPreviousOpinion() {
    const myId = this.cookieService.get('myId');
    const hash = this.cookieService.get('hash');
    const formsData = {
      wine: this.activatedroute.snapshot.params.id,
      confirmation: {myId, hash}
    };
  }

  getTabColor(tab) {
    if (this.system.value == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }
  getMarginleft(i) {
    if (i == 0) {
      return 'ml-0';
    } else {
      return 'margin-left-32';
    }
  }

  choseSystem(x) {
    if (this.langService.editable) {
      return;
    }
    // console.log(s);
    this.system.setValue('');
    this.form.removeControl('full');
    this.form.addControl('full', this.getFormGroup(this.systemsFull[x]));
    this.system.setValue(x);
    // console.log(this.form.value);
    this.systemToShow = this.systemsFull[x];

    if (x == 'systemAny') {
      this.form.get('full').get('_maximum').setValue(localStorage.getItem(this.LOCAL_STORAGE_MAXIMUM_IN_VOTING));
      this.form.get('full').get('_maximum').valueChanges.subscribe(maximum => {
        localStorage.setItem(this.LOCAL_STORAGE_MAXIMUM_IN_VOTING, maximum + '');
      });
    }
  }

  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }
}
