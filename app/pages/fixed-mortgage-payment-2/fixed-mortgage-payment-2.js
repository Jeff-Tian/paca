import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PacaRate} from '../../finance/paca-rate';
import {Rate} from '../../finance/rate';
import {Locale} from '../../locale/locale';
import {Bisection} from '../../finance/bisection';

@Component({
    templateUrl: 'build/pages/fixed-mortgage-payment-2/fixed-mortgage-payment-2.html'
})

export class FixedMortgagePayment2 extends Locale {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        super();
        this._navController = _navController;

        this.model = {
            beginIn: 980000,
            months: 216,
            endOut: null,
            totalInterestRate: null,
            totalInterest: null,
            monthlyInterestRate: null,
            monthlyInterest: null,
            annualInterestRate: null,
            annualInterest: null,
            dailyInterestRate: null,
            dailyInterest: null,
            monthlyPayment: 6581.47
        };

        this.displays = {
            totalInterestRate: {},
            annualInterestRate: {},
            monthlyInterestRate: {},
            dailyInterestRate: {}
        };

        this.updateValues();
    }

    updateValues() {
        this.compute();
        this.updateDisplays();
    }

    updateDisplays() {
        this.displays.totalInterestRate = Rate.getDisplayFormatsOf(this.model.totalInterestRate);
        this.displays.annualInterestRate = Rate.getDisplayFormatsOf(this.model.annualInterestRate);
        this.displays.monthlyInterestRate = Rate.getDisplayFormatsOf(this.model.monthlyInterestRate);
        this.displays.dailyInterestRate = Rate.getDisplayFormatsOf(this.model.dailyInterestRate);
    }

    compute() {
        this.model.monthlyInterestRate = Bisection.findMonthlyInterestRate(this.model.beginIn, this.model.monthlyPayment, this.model.months);

        this.model.endOut = this.model.monthlyPayment * this.model.months;
        this.computeInterestInfo();
    }

    computeInterestInfo() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;
        this.model.dailyInterestRate = PacaRate.dailyRateByMonthly(this.model.monthlyInterestRate);
        this.model.annualInterestRate = PacaRate.annualRateByMonthly(this.model.monthlyInterestRate);
    }

}