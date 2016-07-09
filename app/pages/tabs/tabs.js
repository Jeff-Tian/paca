import {Component} from '@angular/core'
import {HomePage} from '../home-page/home-page';
import {OneOffPayment} from '../one-off-payment/one-off-payment';
import {FixedMortgagePayment} from '../fixed-mortgage-payment/fixed-mortgage-payment';
import {Settings} from '../settings/settings';
import {Locale} from '../../locale/locale';


@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage extends Locale {
    constructor() {
        super();
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tabRateComputingRoot = OneOffPayment;
        this.tabFixedMortgage = FixedMortgagePayment;
        this.tabSettings = Settings;
    }
}
