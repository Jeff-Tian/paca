import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {FixedMortgagePayment} from '../pages/fixed-mortgage-payment/fixed-mortgage-payment';
import {FixedMortgagePayment2} from '../pages/fixed-mortgage-payment-2/fixed-mortgage-payment-2';
import {OneOffPayment} from '../pages/one-off-payment/one-off-payment';
import {Settings} from '../pages/settings/settings';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        Settings,
        FixedMortgagePayment,
        FixedMortgagePayment2,
        OneOffPayment
    ],
    imports: [
        IonicModule.forRoot(MyApp, {}, {
            links: [
                {component: Settings, name: 'Settings', segment: 'settings'},
                {component: FixedMortgagePayment, name: 'FixedMortgagePayment', segment: 'fixedMortgagePayment'},
                {component: FixedMortgagePayment2, name: 'FixedMortgagePayment2', segment: 'fixedMortgagePayment2'},
                {component: OneOffPayment, name: 'OneOffPayment', segment: 'oneOffPayment'}
            ]
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        Settings,
        TabsPage,
        FixedMortgagePayment,
        FixedMortgagePayment2,
        OneOffPayment
    ],
    providers: []
})
export class AppModule {
}
