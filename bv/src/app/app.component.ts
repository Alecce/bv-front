import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bv';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `icn-views`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/views.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/glass.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-corkscrew`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/corkscrew.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-no-corkscrew`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/no_corkscrew.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `icn-amphora`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Amphora.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-awards`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Awards.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-barrel`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/barrel.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-biodynamic`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Biodynamic.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-decanter`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Decanter.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-foot-pressure`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/foot pressure.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/glass.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-hand-vintage`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/hand_vintage.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-kashrut`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Kashrut.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-kosher-pesach`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Kosher_Pesach.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-mevushal`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Mevushal.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-night-vintage`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/night_vintage.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-organic`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Organic.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-vegan`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Vegan.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-SO2-free`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/SO2.svg')
    );

    this.matIconRegistry.addSvgIcon(
      `icn-glass-1`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/1.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-1-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/1_disable.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-2`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-2-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/2_disable.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-3`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/3.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-3-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/3_disable.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-4`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/4.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-4-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/4_disable.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-5`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/5.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-5-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/5_disable.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-6`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/6.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-6-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/6_disable.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-7`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/7.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-glass-7-disable`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Glasses/7_disable.svg')
    );


















    this.matIconRegistry.addSvgIcon(
      `arrow-1-down-orange`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-down-orange.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-down-chrome`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-down-chrome.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-up-chrome`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-up-chrome.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-down-error`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-down-error.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-up-error`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-up-error.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-down-ocean`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-down-ocean.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-up-ocean`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-up-ocean.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-down`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-down.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-up`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-up.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `arrow-1-up-black`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow-1-up-black.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `check`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/checkmark.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `checkmark`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/checkmark.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `checkmark-chrome`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/checkmark-chrome.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `checkmark-black`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/checkmark-black.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-add`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-add-orange.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-add-chrome`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-add-chrome.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-close-bonvine`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-close-orange' +
        '.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-close-bonvine-chrome`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-close-chrome.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-done`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-done.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-error-white`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-error-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-error`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-error.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-error-2`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-error-2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-events`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-events.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-groups`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-groups.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-menu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-menu.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-menu-wine`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-menu-wine.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-search-black`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-search-black.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-search-white`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-search-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-search`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-serarch.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-share`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-share.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-sorting-wine`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-sorting-wine.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-sorting-black`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-sorting-black.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-sorting`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-sorting.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-star`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-star.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-star-filled`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-star-filled.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-star-selected`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-star-selected.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-thumbUp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-thumbUp.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-view-list`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-view-list.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-view-thumbs`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-view-thumbs.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `icn-wines`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/icn-wines.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `logo-bonvono`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/logo-bonvono.svg')
    );
  }
}
