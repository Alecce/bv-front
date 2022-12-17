import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LanguageServiceService} from '../../services/language-service.service';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
import {KashrutSubtableComponent} from './kashrut-subtable/kashrut-subtable.component';
import {QualitySubtableComponent} from './quality-subtable/quality-subtable.component';
import {BiodynamicSubtableComponent} from './biodynamic-subtable/biodynamic-subtable.component';
import {OrganicSubtableComponent} from './organic-subtable/organic-subtable.component';
import {VeganSubtableComponent} from './vegan-subtable/vegan-subtable.component';
import {GrapesSubtableComponent} from './grapes-subtable/grapes-subtable.component';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';
import {environment} from '../../../environments/environment';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {languagesContent} from '../../../environments/languages';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {MultiselectSubtableComponent} from '../multiselect-subtable/multiselect-subtable.component';

@Component({
  selector: 'app-admin-wine',
  templateUrl: './admin-wine.component.html',
  styleUrls: ['./admin-wine.component.css']
})
export class AdminWineComponent extends SuperTabComponent implements OnInit {
  tab = 'winelist';
  isAdditionalDataDownloaded = false;


  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'wine/', hrefId: 'id', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'language', name: 'Language', link: false, href: '', hrefId: '', searchFormControlName: 'language', default: this.langService.getLanguage()},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'international_wn', name: 'Name (int)', link: false, href: '', hrefId: '', searchFormControlName: 'international_wn', default: ''},
    {variable: 'series', name: 'Series', link: false, href: '', hrefId: '', searchFormControlName: 'series', default: ''},
    {variable: 'series_int', name: 'Series in English', link: false, href: '', hrefId: '', searchFormControlName: 'series_int', default: ''},
    {variable: 'winery', name: 'Winery', link: true, href: 'winery/', hrefId: '', searchFormControlName: 'searchWinery', type: 'disabled', default: ''},
    {variable: 'winery_id', name: 'Winery link', link: true, href: 'winery/', hrefId: 'winery_id', searchFormControlName: 'winery_id', type: 'link', default: ''},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry', default: ''},
    {variable: 'grand_type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'grand_type', default: 'select'},
    {variable: 'type', name: 'Special type', link: false, href: '', hrefId: '', searchFormControlName: 'searchType', default: '0'},
    {variable: 'subtype', name: 'Subtype', link: false, href: '', hrefId: '', searchFormControlName: 'subtype', default: '0'},
    {variable: 'wine_color', name: 'Color', link: false, href: '', hrefId: '', searchFormControlName: 'wine_color', default: 'nocolor'},
    {variable: 'vinetype_still', name: 'Still', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_still', default: 'select'},
    // {variable: 'vinetype_color', name: 'Color', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_color', default: ''},
    {variable: 'vinetype_sweetness', name: 'Sweetness', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_sweetness', default: 'select'},
    {variable: 'vinetype_champpagne_sweetness', name: 'Champagne sweetness', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_champpagne_sweetness', default: 'select'},
    {variable: 'vinetype_sparkling', name: 'Sparkling', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_sparkling', default: 'select'},
    {variable: 'vinetype_method', name: 'Method', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_method', default: 'select'},
    {variable: 'gas', name: 'Gas amount', link: false, href: '', hrefId: '', searchFormControlName: 'gas', default: 'select'},
    {variable: 'vinetype_nongrape', name: 'Nongrape', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_nongrape', default: 'select'},

    {variable: 'vintage_year', name: 'Year', link: false, href: '', hrefId: '', searchFormControlName: 'vintage_year', default: ''},
    {variable: 'userid', name: 'User', link: false, href: '', hrefId: '', searchFormControlName: 'userid', default: 0},
    {variable: 'alcohol_percents', name: 'Alcohol', link: false, href: '', hrefId: '', searchFormControlName: 'alcohol_percents', default: ''},
    {variable: 'wine_description', name: 'Description', link: false, href: '', hrefId: '', searchFormControlName: 'wine_description', type: 'textarea', default: ''},
    {variable: 'description_int', name: 'Description (int)', link: false, href: '', hrefId: '', searchFormControlName: 'description_int', type: 'textarea', default: ''},
    {variable: 'wine_maker', name: 'Wine maker', link: false, href: '', hrefId: '', searchFormControlName: 'wine_maker', default: ''},
    {variable: 'international_wm', name: 'Wine maker (int)', link: false, href: '', hrefId: '', searchFormControlName: 'international_wm', default: ''},
    // {variable: 'barrel_month_range', name: 'Barrel month range', link: false, href: '', hrefId: '', searchFormControlName: 'barrel_month_range', default: ''},


    {variable: 'destemming', name: 'Destemming', link: false, href: '', hrefId: '', searchFormControlName: 'destemming', type: 'select', default: 0},
    {variable: 'sorting', name: 'Sorting', link: false, href: '', hrefId: '', searchFormControlName: 'sorting', type: 'checkbox', default: ''},
    {variable: 'sorting_optic', name: 'Optic sorting', link: false, href: '', hrefId: '', searchFormControlName: 'sorting_optic', type: 'checkbox', default: ''},
    {variable: 'sorting_manual', name: 'Manual sorting', link: false, href: '', hrefId: '', searchFormControlName: 'sorting_manual', type: 'checkbox', default: ''},
    {variable: 'transfer', name: 'Transfer', link: false, href: '', hrefId: '', searchFormControlName: 'transfer', type: 'checkbox', default: ''},
    {variable: 'crushing', name: 'Crushing', link: false, href: '', hrefId: '', searchFormControlName: 'crushing', type: 'select', default: 0},

    {variable: 'maceration_time', name: 'Maceration time', link: false, href: '', hrefId: '', searchFormControlName: 'maceration_time', default: ''},
    {variable: 'maceration_size', name: 'Maceration size', link: false, href: '', hrefId: '', searchFormControlName: 'maceration_size', default: 'hour'},
    {variable: 'maceration_temperature', name: 'Maceration temperature (Celsius)', link: false, href: '', hrefId: '', searchFormControlName: 'maceration_temperature', default: ''},
    {variable: 'maceration_is_fahrenheit', name: 'Convert maceration to fahrenheit?', link: false, href: '', hrefId: '', searchFormControlName: 'maceration_is_fahrenheit', type: 'checkbox', default: false},
    {variable: 'maceration_carbonic', name: 'Carbonic maceration', link: false, href: '', hrefId: '', searchFormControlName: 'maceration_carbonic', type: 'checkbox', default: false},
    {variable: 'fermentation_tank', name: 'Fermentation tank', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_tank', default: 'inox'},
    {variable: 'fermentation_temperature', name: 'Fermentation temperature', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_temperature', default: ''},
    {variable: 'fermentation_is_fahrenheit', name: 'Convert fermentation to fahrenheit?', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_is_fahrenheit', type: 'checkbox', default: false},
    {variable: 'fermentation_days', name: 'Fermentation days', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_days', default: ''},
    {variable: 'fermentation_tank_orientation', name: 'Fermentation tank orientation', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_tank_orientation', type: 'select', default: 0},
    {variable: 'fermentation_open_top', name: 'Fermentation open top', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_open_top', type: 'checkbox', default: false},
    {variable: 'fermentation_yeast', name: 'Fermentation yeast', link: false, href: '', hrefId: '', searchFormControlName: 'fermentation_yeast', type: 'select', default: 0},
    {variable: 'ph', name: 'pH', link: false, href: '', hrefId: '', searchFormControlName: 'ph', default: ''},
    {variable: 'volatile_acidity', name: 'Volatile acidity', link: false, href: '', hrefId: '', searchFormControlName: 'volatile_acidity', default: ''},
    {variable: 'sugar', name: 'Sugar', link: false, href: '', hrefId: '', searchFormControlName: 'sugar', default: ''},
    {variable: 'energy', name: 'Energy', link: false, href: '', hrefId: '', searchFormControlName: 'energy', default: ''},
    {variable: 'bottled_by', name: 'Bottled by', link: false, href: '', hrefId: '', searchFormControlName: 'bottled_by', default: 'not chosen'},
    {variable: 'bottled_by_date', name: 'Bottled by date', link: false, href: '', hrefId: '', searchFormControlName: 'bottled_by_date', default: ''},
    {variable: 'fining', name: 'Fining', link: false, href: '', hrefId: '', searchFormControlName: 'fining', type: 'select', default: 0},
    {variable: 'is_passover', name: 'Is passover', link: false, href: '', hrefId: '', searchFormControlName: 'is_passover', type: 'checkbox', default: false},
    // {variable: 'count_in_pack', name: 'count_in_pack', link: false, href: '', hrefId: '', searchFormControlName: 'count_in_pack', default: ''},
    {variable: 'is_mevushal', name: 'Is mevushal', link: false, href: '', hrefId: '', searchFormControlName: 'is_mevushal', type: 'checkbox', default: false},
    {variable: 'night_harvest', name: 'Night harvest', link: false, href: '', hrefId: '', searchFormControlName: 'night_harvest', type: 'checkbox', default: false},
    {variable: 'hand_picked', name: 'Hand picked', link: false, href: '', hrefId: '', searchFormControlName: 'hand_picked', type: 'checkbox', default: false},
    {variable: 'filtered', name: 'Filtered', link: false, href: '', hrefId: '', searchFormControlName: 'filtered', type: 'checkbox', default: false},
    {variable: 'screwcap', name: 'Cork', link: false, href: '', hrefId: '', searchFormControlName: 'screwcap', default: '0'},
    {variable: 'light_filtered', name: 'Light filtered', link: false, href: '', hrefId: '', searchFormControlName: 'light_filtered', type: 'checkbox', default: false},
    {variable: 'filtration', name: 'Filtration', link: false, href: '', hrefId: '', searchFormControlName: 'filtration', type: 'select', default: 0},
    // {variable: 'malolactic_fermentation', name: 'Malolactic fermentation', link: false, href: '', hrefId: '', searchFormControlName: 'malolactic_fermentation', default: ''},
    {variable: 'malolactic_fermentation_store', name: 'Malolactic fermentation', link: false, href: '', hrefId: '', searchFormControlName: 'malolactic_fermentation_store', default: 'no'},
    {variable: 'malolactic_partial', name: 'Malolactic partial', link: false, href: '', hrefId: '', searchFormControlName: 'malolactic_partial', type: 'checkbox', default: false},
    {variable: 'sulfur_dioxide', name: 'Sulfur dioxide', link: false, href: '', hrefId: '', searchFormControlName: 'sulfur_dioxide', type: 'checkbox', default: false},
    {variable: 'drink_from', name: 'Drink from', link: false, href: '', hrefId: '', searchFormControlName: 'drink_from', default: ''},
    {variable: 'drink_to', name: 'Drink to', link: false, href: '', hrefId: '', searchFormControlName: 'drink_to', default: ''},
    {variable: 'need_decanter', name: 'Need decanter', link: false, href: '', hrefId: '', searchFormControlName: 'need_decanter', type: 'checkbox', default: false},
    {variable: 'serving_temperature', name: 'Serving temperature', link: false, href: '', hrefId: '', searchFormControlName: 'serving_temperature', default: ''},
    {variable: 'glass', name: 'Glass', link: false, href: '', hrefId: '', searchFormControlName: 'glass', default: ''},// {variable: 'vinetype_style', name: 'Style', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_style', default: ''},
    // {variable: 'vinetype_substyle', name: 'Substyle', link: false, href: '', hrefId: '', searchFormControlName: 'vinetype_substyle', default: ''},
    {variable: 'batonnage', name: 'Batonnage', link: false, href: '', hrefId: '', searchFormControlName: 'batonnage', type: 'checkbox', default: false},
    {variable: 'for_collection', name: 'It befits to the collection', link: false, href: '', hrefId: '', searchFormControlName: 'for_collection', type: 'checkbox', default: false},

    {variable: 'is_barrel_aged', name: 'Is barrel aged', link: false, href: '', hrefId: '', searchFormControlName: 'is_barrel_aged', type: 'checkbox', default: false},
    {variable: 'barrels', name: 'barrels', link: false, href: '', hrefId: '', searchFormControlName: 'barrels', type: 'subtable', default: '',
      page: 'wines_common_info',
      subtable: [
        {variable: 'barrel_stuff', control: 'stuff', default: 'not chosen', type: 'select', place: 'barrel_stuff', name: 'Barrel stuff',
          options: [
            {value: 'not chosen', place: 'select', default: 'Select'},
            {value: 'clay', place: 'caly', default: 'Clay'},
            {value: 'stainless steel tank', place: 'stainless_steel_tank', default: 'Stainless steel tank'},
            {value: 'wood oak', place: 'wood_oak', default: 'Wood oak'},
            {value: 'Cement (concrete) tanks', place: 'Cement (concrete) tanks', default: 'Cement (concrete) tanks'},
            {value: 'Plastic tanks', place: 'Plastic tanks', default: 'Plastic tanks'},
          ]
        },
        {variable: 'month', control: 'month', default: '', type: 'text', place: 'month', name: 'Month'},
        {variable: 'barrel_type', control: 'type', default: 'not chosen', type: 'select', place: 'barrel_type', name: 'Barrel type',
          options: [
            {value: 'not chosen', place: 'select', default: 'Select'},
            // {value: '1', place: 'French', default: 'French'},
            // {value: '2', place: 'American', default: 'American'},
            // {value: '3', place: 'Eastern European', default: 'Eastern European'},
            // {value: '4', place: 'Neutral oak', default: 'Neutral oak'},
            // {value: '5', place: 'Hungarian', default: 'Hungarian'},
            // {value: '6', place: 'Slovenian', default: 'Slovenian'},
            // {value: '7', place: 'Russian', default: 'Russian'},
          ]
        },
        {variable: 'barrel_size', control: 'size', default: 'not chosen', type: 'select', place: 'barrel_size', name: 'Barrel size',
          options: [
            {value: 'not chosen', place: 'select', default: 'Select'},
            // {value: '112L', place: '112L', default: '112L – 30 US Gallons'},
            // {value: '225L', place: '225L', default: '225L – 59.4 US Gallons'},
            // {value: '228L', place: '228L', default: '228L – 60 US Gallons'},
            // {value: '300L', place: '300L', default: '300L – 79 US Gallons'},
            // {value: '500L', place: '500L', default: '500L – 132 US Gallons'},
            // {value: '600L', place: '600L', default: '600L – 158.5 USGallons'},
            // {value: '2K-12KL', place: '2K-12KL', default: '2K-12KL – 500-32K US Gallons'},
          ]
        },
        {variable: 'new_or_used', control: 'use', default: 'not chosen', type: 'select', place: 'new_or_used', name: 'New or used',
          options: [
            {value: 'not chosen', place: 'select', default: 'Select'},
            {value: 'new', place: 'new', default: 'New'},
            {value: 'used', place: 'used', default: 'Used'},
            {value: 'neutral', place: 'neutral', default: 'Neutral'},
          ]
        },
        {variable: 'percent_of_wine', control: 'percent', default: '', type: 'text', place: 'percent_of_wine', name: 'Percent of wine'},

        {variable: 'sur_lie', control: 'sur_lie', default: '', type: 'checkbox', place: 'sur_lie', name: 'Sur lie'},
      ]
    },
    {variable: 'pressing', name: 'pressing', link: false, href: '', hrefId: '', searchFormControlName: 'pressing', type: 'subtable', default: '',
      page: 'wines_common_info',
      subtable: [
        {variable: 'type', control: 'type', default: 'not chosen', type: 'select', place: 'type', name: 'Type',
          options: [
            {value: '0', place: 'select', default: 'Select'},
            {value: 'Free-run‫', place: 'Free-run‫', default: 'Free-run‫'},
            {value: '‬Grape stomping', place: '‬Grape stomping', default: '‬Grape stomping'},
            {value: 'Pneumatic (bladder)', place: 'Pneumatic (bladder)', default: 'Pneumatic (bladder)'},
            {value: 'Basket', place: 'Basket', default: 'Basket'},
            {value: 'Moving head', place: 'Moving head', default: 'Moving head'},
            {value: 'Membrane', place: 'Membrane', default: 'Membrane'},
            {value: 'Screw', place: 'Screw', default: 'Screw'},
            {value: 'Impulse', place: 'Impulse', default: 'Impulse'},
            {value: 'Belt', place: 'Belt', default: 'Belt'},
          ]
        },
        {variable: 'gently', control: 'gently', default: '', type: 'checkbox', place: 'gently', name: 'Gently pressed'},
        {variable: 'order', control: 'order', default: 'not chosen', type: 'select', place: 'pressing', name: 'Pressing',
          options: [
            {value: '0', place: 'select', default: 'Select'},
            {value: 'Free-run', place: 'Free-run', default: 'Free-run'},
            {value: '1st Pressing', place: '1st Pressing', default: '1st Pressing'},
            {value: '2st Pressing', place: '2st Pressing', default: '2st Pressing'},
            {value: '3st Pressing', place: '3st Pressing', default: '3st Pressing'},
          ]
        },
        {variable: 'percent', control: 'percent', default: '', type: 'text', place: 'percent', name: 'Percent'},
      ]
    },
    // {variable: 'proff_points', name: 'professional points', link: false, href: '', hrefId: '', searchFormControlName: 'proff_points', type: 'subtable', default: '',
    //   page: 'wines_common_info',
    //   subtable: [
    //     {variable: 'professional', control: 'professional', default: 'not chosen', type: 'select', place: 'professional', name: 'Professional',
    //       options: [
    //         {value: 'not chosen', place: 'select', default: 'Select'},
    //       ]
    //     },
    //     {variable: 'point', control: 'point', default: '', type: 'text', place: 'point', name: 'Point'},
    //   ]
    // },

    {variable: 'wrapping', name: 'Bottle informaition', link: false, href: '', hrefId: '', searchFormControlName: 'wrapping', type: 'subtable', default: '',
      page: 'wines_advanced',
      subtable: [
        {variable: 'size', control: 'size', default: '0', type: 'select', place: 'bottle_sizes', name: 'Bottle Sizes',
          options: [
            {value: '0', place: 'select', default: 'Select'},
          ]
        },
        {variable: 'batch', control: 'total_bottles', default: '', type: 'text', place: 'batch', name: 'Batch'},
        {variable: 'pack', control: 'count_in_pack', default: '', type: 'text', place: 'pack', name: 'Pack'},
        {variable: 'barcode', control: 'barcode_bottles', default: '', type: 'text', place: 'barcode', name: 'Barcode'},

        {variable: 'price_level', control: 'priceLevel', default: 'not chosen', type: 'select', place: 'price_level', name: 'Price level',
          options: [
            {value: '0', place: 'select', default: 'Select'},
          ]
        },
      ]
    },

    {variable: 'competition', name: 'Competition informaition', link: false, href: '', hrefId: '', searchFormControlName: 'competition', type: 'subtable', default: '',
      page: 'wines_advanced',
      subtable: [
        {variable: 'competition', control: 'competition', default: '0', type: 'select', place: 'competition', name: 'Bottle Sizes',
          options: [
            {value: '0', place: 'select', default: 'Select'},
          ]
        },
        {variable: 'year', control: 'year', default: '', type: 'text', place: 'year', name: 'Year'},
        {variable: 'award', control: 'award', default: 'not chosen', type: 'select', place: 'award', name: 'Award',
          options: [
            {value: '0', place: 'select', default: 'Select'},
          ]
        },
      ]
    },


    {variable: 'is_kosher', name: 'Is kosher', link: false, href: '', hrefId: '', searchFormControlName: 'is_kosher', type: 'checkbox', default: false},
    {variable: 'kashrutData', name: 'Kashrut list', link: false, href: '', hrefId: '', searchFormControlName: 'kashrutData', type: 'special',
      default: {kashrutsWine: [], kashruts: []},
      component: KashrutSubtableComponent},
    {variable: 'quality', name: 'Is quality', link: false, href: '', hrefId: '', searchFormControlName: 'quality', type: 'checkbox', default: false},
    {variable: 'qualityData', name: 'Quality list', link: false, href: '', hrefId: '', searchFormControlName: 'qualityData', type: 'special',
      default: {qualitiesWine: [], qualities: []},
      component: QualitySubtableComponent},
    {variable: 'biodynamic', name: 'Is biodynamic', link: false, href: '', hrefId: '', searchFormControlName: 'biodynamic', type: 'checkbox', default: false},
    {variable: 'biodynamicData', name: 'Biodynamic list', link: false, href: '', hrefId: '', searchFormControlName: 'biodynamicData', type: 'special',
      default: {biodynamicWine: [], biodynamics: []},
      component: BiodynamicSubtableComponent},
    {variable: 'organic_wine', name: 'Is organic', link: false, href: '', hrefId: '', searchFormControlName: 'organic_wine', type: 'checkbox', default: false},
    {variable: 'organicData', name: 'Organic list', link: false, href: '', hrefId: '', searchFormControlName: 'organicData', type: 'special',
      default: {organicWine: [], organics: []},
      component: OrganicSubtableComponent},
    {variable: 'vegan', name: 'Is vegan', link: false, href: '', hrefId: '', searchFormControlName: 'vegan', type: 'checkbox', default: false},
    {variable: 'veganData', name: 'Vegan list', link: false, href: '', hrefId: '', searchFormControlName: 'veganData', type: 'special',
      default: {veganWine: [], vegans: []},
      component: VeganSubtableComponent},
    {variable: 'grapeData', name: 'Grape data', link: false, href: '', hrefId: '', searchFormControlName: 'grapeData', type: 'special',
      default: {additionalGrapes: [], additionalVineyards: [], dumpgrape: '[]'},
      component: GrapesSubtableComponent},

    {variable: 'menu', name: 'Menu', link: false, href: '', hrefId: '', searchFormControlName: 'menu', type: 'multicheckbox',
      default: [],
      component: MultiselectSubtableComponent},



    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.wineImageStore},
  ];


  storage = 'wineImages';
  lists = {
    country: [
    ],
    type: [
      {id: '0', name: 'Select'},
    ],
    language: [],
    grand_type: [
      {id: 'select', name: 'select'},
      {id: 'still', name: 'still'},
      {id: 'sparkling', name: 'sparkling'},
      {id: 'nongrape', name: 'nongrape'},
    ],
    vinetype_still: [
      {id: 'select', name: 'select'},
      {id: 'usual', name: 'usual'},
      {id: 'fortified', name: 'fortified'},
      {id: 'concentrated', name: 'concentrated'},
    ],
    wine_color: [
      {id: 'nocolor', name: 'nocolor'},
      {id: 'white', name: 'white'},
      {id: 'rose', name: 'rose'},
      {id: 'red', name: 'red'},
      {id: 'orange', name: 'orange'},
    ],
    vinetype_sweetness: [
      {id: 'select', name: 'select'},
      {id: 'dry', name: 'dry'},
      {id: 'semi-dry', name: 'semi_dry'},
      {id: 'semi-sweet', name: 'semi_sweet'},
      {id: 'sweet', name: 'sweet'},
    ],
    vinetype_champpagne_sweetness: [
      {id: 'select', name: 'select'},
      {id: 'Extra Brut', name: 'Extra Brut'},
      {id: 'Brut', name: 'Brut'},
      {id: 'Extra Dry', name: 'Extra Dry'},
      {id: 'Sec', name: 'Sec'},
      {id: 'Demi-Sec', name: 'Demi-Sec'},
      {id: 'Doux', name: 'Doux'},
    ],
    gas: [
      {id: 'select', name: 'select'},
      {id: 'Beady', name: 'Beady'},
      {id: 'Semi-sparkling', name: 'Semi-sparkling'},
      {id: 'Sparkling', name: 'Sparkling'},
    ],
    subtype: [
      {id: '0', name: 'select'},
      // {id: 'Ruby', name: 'Ruby'},
      // {id: 'Tawny', name: 'Tawny'},
      // {id: 'Aged Tawny', name: 'Aged Tawny'},
      // {id: 'Colheita', name: 'Colheita'},
      // {id: 'Crusted', name: 'Crusted'},
      // {id: 'Single-Quinta', name: 'Single-Quinta'},
      // {id: 'Late-Bottled Vintage (LBV)', name: 'Late-Bottled Vintage (LBV)'},
      // {id: 'Vintage', name: 'Vintage'},
      // {id: 'Fino', name: 'Fino'},
      // {id: 'Manzanilla', name: 'Manzanilla'},
      // {id: 'Amontillado', name: 'Amontillado'},
      // {id: 'Palo Cortado', name: 'Palo Cortado'},
      // {id: 'Oloroso', name: 'Oloroso'},
      // {id: 'Pedro Ximénez', name: 'Pedro Ximénez'},
      // {id: 'Moscatel', name: 'Moscatel'},
      // {id: 'Medium', name: 'Medium'},
      // {id: 'Pale Cream', name: 'Pale Cream'},
      // {id: 'Cream', name: 'Cream'},
      // {id: 'Dulce', name: 'Dulce'},
    ],
    vinetype_sparkling: [
      {id: 'select', name: 'select'},
      // {id: 'champagne', name: 'champagne'},
      // {id: 'champagne style', name: 'champagne style'},
      // {id: 'cava', name: 'cava'},
      // {id: 'spumante', name: 'spumante'},
      // {id: 'spumante', name: 'spumante'},
      // {id: 'cap classique', name: 'cap classique'},
      // {id: 'sekt', name: 'sekt'},
      // {id: 'cre\'mant', name: 'cremant'},
      // {id: 'franciacorta', name: 'franciacorta'},
      // {id: 'prosecco', name: 'prosecco'},
      // {id: 'lambrusco', name: 'lambrusco'},
      // {id: 'bracchetto', name: 'bracchetto'},
      // {id: 'asti', name: 'asti'},
      // {id: 'afrodes inos', name: 'afrodes inos'},
    ],
    vinetype_method: [
      {id: 'select', name: 'select'},
      {id: 'traditional', name: 'traditional'},
      {id: 'ancestral', name: 'ancestral'},
      {id: 'transfer', name: 'transfer'},
      {id: 'dioise', name: 'dioise'},
      {id: 'charmat', name: 'charmat'},
      {id: 'continuous', name: 'continuous'},
      {id: 'continuous', name: 'continuous'},
      {id: 'carbonation', name: 'carbonation'},
    ],
    vinetype_nongrape: [
      {id: 'select', name: 'select'},
      // {id: 'mead', name: 'mead'},
      // {id: 'rice', name: 'rice'},
      // {id: 'apricot', name: 'apricot'},
      // {id: 'banana', name: 'banana'},
      // {id: 'blackberry', name: 'blackberry'},
      // {id: 'blueberry', name: 'blueberry'},
      // {id: 'cashew', name: 'cashew'},
      // {id: 'cherry', name: 'cherry'},
      // {id: 'cloudberry', name: 'cloudberry'},
      // {id: 'cranberry', name: 'cranberry'},
      // {id: 'crowberry', name: 'crowberry'},
      // {id: 'elderberry', name: 'elderberry'},
      // {id: 'feijoa or pineapple guava', name: 'feijoa or pineapple guava'},
      // {id: 'goji (wolfberry)', name: 'goji (wolfberry)'},
      // {id: 'gooseberry', name: 'gooseberry'},
      // {id: 'huckleberry', name: 'huckleberry'},
      // {id: 'kiwifruit', name: 'kiwifruit'},
      // {id: 'loquat', name: 'loquat'},
      // {id: 'lychee', name: 'lychee'},
      // {id: 'mahonia', name: 'mahonia'},
      // {id: 'mango', name: 'mango'},
      // {id: 'mangosteen', name: 'mangosteen'},
      // {id: 'peach', name: 'peach'},
      // {id: 'pear', name: 'pear'},
      // {id: 'plum', name: 'plum'},
      // {id: 'raspberry', name: 'raspberry'},
      // {id: 'redcurrant', name: 'redcurrant'},
      // {id: 'rowan', name: 'rowan'},
      // {id: 'persimmon', name: 'persimmon'},
      // {id: 'pineapple', name: 'pineapple'},
      // {id: 'pomegranate', name: 'pomegranate'},
      // {id: 'quince', name: 'quince'},
      // {id: 'rose hip', name: 'rose hip'},
      // {id: 'saskatoon berry', name: 'saskatoon berry'},
      // {id: 'sea-buckthorn', name: 'sea-buckthorn'},
      // {id: 'strawberry', name: 'strawberry'},
      // {id: 'sweetsop', name: 'sweetsop'},
      // {id: 'tomato', name: 'tomato'},
      // {id: 'watermelon', name: 'watermelon'},
      // {id: 'Vegetables and roots', name: 'Vegetables and roots'},
      // {id: 'carrot', name: 'carrot'},
      // {id: 'chives', name: 'chives'},
      // {id: 'lemongrass', name: 'lemongrass'},
      // {id: 'parsnip', name: 'parsnip'},
      // {id: 'potato', name: 'potato'},
      // {id: 'rhubarb', name: 'rhubarb'},
      // {id: 'Flowers', name: 'Flowers'},
      // {id: 'dandelion', name: 'dandelion'},
      // {id: 'elderflower or elder blow (made from elderberry flowers)', name: 'elderflower or elder blow (made from elderberry flowers)'},
      // {id: 'hibiscus or jamaica', name: 'hibiscus or jamaica'},
      // {id: 'Tree sap', name: 'Tree sap'},
      // {id: 'maple wine', name: 'maple wine'},
      // {id: 'palm wine (toddy)', name: 'palm wine (toddy)'},
    ],
    bottled_by: [
      {id: 'not chosen', name: 'not chosen'},
      {id: 'estate', name: 'estate'},
      {id: 'mobile', name: 'mobile'},
    ],


    maceration_size: [
      {id: 'hour', name: 'hour'},
      {id: 'day', name: 'day'},
    ],
    fermentation_tank: [
      {id: 'inox', name: 'inox'},
      {id: 'barriques', name: 'barriques'},
    ],
    malolactic_fermentation_store: [
      {id: 'no', name: 'no'},
      {id: 'inox', name: 'inox'},
      {id: 'barriques', name: 'barriques'},
    ],
    screwcap: [
      {id: '0', name: 'select'},
      // {id: 'Regular Cork', name: 'Regular Cork'},
      // {id: 'Agglomerate Cork', name: 'Agglomerate Cork'},
      // {id: 'Champagne Cork', name: 'Champagne Cork'},
      // {id: 'Synthetic Cork', name: 'Synthetic Cork'},
      // {id: 'Screw Cork', name: 'Screw Cork'},
      // {id: 'Vino-Lok Cork', name: 'Vino-Lok Cork'},
      // {id: 'Zork Cork', name: 'Zork Cork'},
    ],
    destemming: [
      {id: '0', name: 'no selection'},
      {id: 'Manual', name: 'Mechanical'},
      {id: 'Manual', name: 'Manual'},
    ],
    crushing: [
      {id: '0', name: 'no selection'},
      {id: 'Without', name: 'Without'},
      {id: 'Gently squeezed', name: 'Gently squeezed'},
    ],
    fermentation_tank_orientation: [
      {id: '0', name: 'no selection'},
      {id: 'Vertical', name: 'Vertical'},
      {id: 'Horizontal', name: 'Horizontal'},
    ],
    fermentation_yeast: [
      {id: '0', name: 'no selection'},
      {id: 'Natural', name: 'Natural'},
      {id: 'Cultural', name: 'Cultural'},
    ],
    fining: [
      {id: '0', name: 'no selection'},
      {id: 'Decanting', name: 'Decanting'},
      {id: 'Cold', name: 'Cold'},
      {id: 'Egg whites', name: 'Egg whites'},
      {id: 'Blood', name: 'Blood'},
      {id: 'Bones', name: 'Bones'},
      {id: 'Milk', name: 'Milk'},
      {id: 'Isinglass', name: 'Isinglass'},
      {id: 'Irish moss', name: 'Irish moss'},
      {id: 'Bentonite', name: 'Bentonite'},
      {id: 'Gelatin', name: 'Gelatin'},
      {id: 'Casein', name: 'Casein'},
      {id: 'Carrageenan', name: 'Carrageenan'},
      {id: 'Alginate', name: 'Alginate'},
      {id: 'Diatomaceous earth', name: 'Diatomaceous earth'},
      {id: 'Pectinase', name: 'Pectinase'},
      {id: 'Pectolyase', name: 'Pectolyase'},
      {id: 'PVPP', name: 'PVPP'},
      {id: 'Kieselsol (colloidal silica)', name: 'Kieselsol (colloidal silica)'},
      {id: 'Copper sulfate', name: 'Copper sulfate'},
      {id: 'Dried albumen', name: 'Dried albumen'},
      {id: 'Hydrated yeast', name: 'Hydrated yeast'},
      {id: 'Activated carbon', name: 'Activated carbon'},
      {id: 'Chitosan', name: 'Chitosan'},
    ],
    filtration: [
      {id: '0', name: 'no selection'},
      {id: 'Earth Filtration (DE)', name: 'Earth Filtration (DE)'},
      {id: 'Pad Filtration', name: 'Pad Filtration'},
      {id: 'Membrane Filtration', name: 'Membrane Filtration'},
      {id: 'Cross-Flow Filtration', name: 'Cross-Flow Filtration'},
      {id: 'Ultra-Filtration', name: 'Ultra-Filtration'},
      {id: 'Ceramic Membrane Crossflow', name: 'Ceramic Membrane Crossflow'},
      {id: 'Microfiltration', name: 'Microfiltration'},
      {id: 'Reverse osmosis', name: 'Reverse osmosis'},
      {id: 'Centrifuge', name: 'Centrifuge'},
    ],
    menu: [
      {id: 'description', name: 'description'},
      {id: 'certification', name: 'certification'},
      {id: 'awards', name: 'awards'},
      {id: 'analysis', name: 'analysis'},
      {id: 'crushing', name: 'crushing'},
      {id: 'maceration_fermentation', name: 'maceration_fermentation'},
      {id: 'grape', name: 'grape'},
      {id: 'ageing', name: 'ageing'},
      {id: 'pressing', name: 'pressing'},
      {id: 'professional_points', name: 'professional_points'},
      {id: 'bottle', name: 'bottle'},
      {id: 'serving', name: 'serving'},
      {id: 'full_description', name: 'full_description'},
    ],
  };

  disabledRows = {
    country: true,
  };
  api = 'getWinelist';
  apiSend = 'setWine';
  apiDelete = 'deleteWine';

  // @ts-ignore
  @ViewChild(AdminSuperlistComponent) superlist: AdminSuperlistComponent;

  constructor(
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    private service: RequestsService,
  ) {

    super();

  }

  ngOnInit() {



  }

  getData() {
    this.superlist.getData();
  }


  public downloadAdditionalData() {

    if (this.isAdditionalDataDownloaded) {
      return;
    }
    this.isAdditionalDataDownloaded = true;

    languagesContent.forEach(x => {

      this.lists.language.push({id: x.value, name: x.name});
    });


    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.lists.country = data;
    });

    this.service.getProfessionalList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'proff_points')[0]
        .subtable.filter(x => x.variable === 'professional')[0];
      // console.log(place.options);
      // console.log(data);
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.id, place: d.name, default: d.name});
      });
    });

    this.service.getPriceList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'wrapping')[0]
        .subtable.filter(x => x.variable === 'price_level')[0];
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.id, place: d.price, default: d.price});
      });
    });
    this.service.getWrapList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'wrapping')[0]
        .subtable.filter(x => x.variable === 'size')[0];
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.id, place: d.size, default: d.size});
      });
    });


    this.service.getWineType().subscribe(data => {
// @ts-ignore
      data.forEach(x => {
        this.lists.type.push({id: x.id, name: x.type});
      });
    });
    this.service.getWineSubType().subscribe(data => {
// @ts-ignore
      data.forEach(x => {
        this.lists.subtype.push({id: x.name, name: x.name});
      });
    });
    this.service.getSparklingType().subscribe(data => {
// @ts-ignore
      data.forEach(x => {
        this.lists.vinetype_sparkling.push({id: x.name, name: x.name});
      });
    });
    this.service.getNongrapeTypes().subscribe(data => {
// @ts-ignore
      data.forEach(x => {
        this.lists.vinetype_nongrape.push({id: x.name, name: x.name});
      });
    });
    this.service.getCorkTypes().subscribe(data => {
// @ts-ignore
      data.forEach(x => {
        this.lists.screwcap.push({id: x.name, name: x.name});
      });
    });

    this.service.getCompetitionsList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'competition')[0]
        .subtable.filter(x => x.variable === 'competition')[0];
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.id, place: d.compname_en, default: d.compname_en});
      });
    });
    this.service.getAwardsList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'competition')[0]
        .subtable.filter(x => x.variable === 'award')[0];
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.id, place: d.name, default: d.name});
      });
    });


    this.service.getBarrelTypeList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'barrels')[0]
        .subtable.filter(x => x.variable === 'barrel_type')[0];
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.id, place: d.name, default: d.name});
      });
    });

    this.service.getBarrelSizeList().subscribe(data => {
      const place = this.tableCols.filter(x => x.variable === 'barrels')[0]
        .subtable.filter(x => x.variable === 'barrel_size')[0];
// @ts-ignore
      data.forEach(d => {
        place.options.push({value: d.value, place: d.name, default: d.name});
      });
    });


  }
}
