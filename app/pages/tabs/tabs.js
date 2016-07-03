import {Component} from '@angular/core'
import {HomePage} from '../home-page/home-page';
import {OneOffPayment} from '../one-off-payment/one-off-payment';
import {FixedMortgagePayment} from '../fixed-mortgage-payment/fixed-mortgage-payment';
import {Settings} from '../settings/settings';


@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    constructor() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tabRateComputingRoot = OneOffPayment;
        this.tabFixedMortgage = FixedMortgagePayment;
        // this.tab2Root = AboutPage;
        this.tabSettings = Settings;
    }
}
