import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {FixedMortgagePayment} from '../fixed-mortgage-payment/fixed-mortgage-payment';
import {FixedMortgagePayment2} from '../fixed-mortgage-payment-2/fixed-mortgage-payment-2';
import {OneOffPayment} from '../one-off-payment/one-off-payment';
import {Locale} from '../../locale/locale';
import {Settings} from '../settings/settings';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage extends Locale {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tabFixedMortgage: any = FixedMortgagePayment;
    tabFixedMortgage2: any = FixedMortgagePayment2;
    tabRateComputingRoot: any = OneOffPayment;
    tabSettings: any = Settings;

    constructor() {
        super();
    }
}
