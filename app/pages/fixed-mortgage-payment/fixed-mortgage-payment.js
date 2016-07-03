import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Settings} from '../settings/settings';
import {Rate} from '../../finance/rate';

@Component({
    templateUrl: 'build/pages/fixed-mortgage-payment/fixed-mortgage-payment.html'
})

export class FixedMortgagePayment {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        this._navController = _navController;

        this.model = {
            beginIn: 123000,
            duration: 24,
            endOut: 129862.2,
            totalInterestRate: 0,
            totalInterest: 0,
            monthlyInterestRate: 0,
            monthlyInterest: 0,
            annualInterestRate: 0,
            annualInterest: 0,
            dailyInterestRate: 0,
            dailyInterest: 0
        };

        this.displays = {
            totalInterestRate: {},
            annualInterestRate: {},
            monthlyInterestRate: {},
            dailyInterestRate: {}
        };

        this.source = 'beginIn';
    }

    updateValues() {
        if (typeof this.changeSource === 'function') {
            this.changeSource();
        }
    }

    changeSource(source) {
        this.source = source;
    }
}