import {Component} from '@angular/core'
import {HomePage} from '../home-page/home-page';
import {RateComputing} from '../rate-computing/rate-computing';
import {AboutPage} from '../about-page/about-page';
import {Settings} from '../settings/settings';


@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    constructor() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tabRateComputingRoot = RateComputing;
        this.tab2Root = AboutPage;
        this.tabSettings = Settings;
    }
}
