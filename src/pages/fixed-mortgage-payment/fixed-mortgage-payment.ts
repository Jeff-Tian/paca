import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PacaRate} from '../../finance/paca-rate';
import {Rate} from '../../finance/rate';
import {Locale} from '../../locale/locale';

@Component({
    selector: 'fixed-mortgage-payment',
    templateUrl: 'fixed-mortgage-payment.html'
})

export class FixedMortgagePayment extends Locale {
    public model;
    public displays;

    constructor(public navCtrl: NavController) {
        super();

        this.model = {
            beginIn: 980000,
            months: 216,
            endOut: null,
            totalInterestRate: null,
            totalInterest: null,
            monthlyInterestRate: null,
            monthlyInterest: null,
            annualInterestRate: 0.0441,
            annualInterest: null,
            dailyInterestRate: null,
            dailyInterest: null,
            monthlyPayment: null
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

    /**
     * A(1+i_m)^n=a*(1-(1+i_m)^n)/i_m
     *
     * Let q = (1+i_m)^n, p = (1+i_m),
     *
     * Aq=a(q-1)/(p-1), a = Aq(p-1)/(q-1) = A*q*i_m/(q-1)
     *
     * Aq(p-1)=aq-a
     * Ap^(n+1) - (A-a)p^n + a = 0
     */
    compute() {
        this.model.monthlyInterestRate = PacaRate.monthlyRateByAnnual(this.model.annualInterestRate);
        this.computeMonthlyPayment();
        this.model.endOut = this.model.monthlyPayment * this.model.months;
        this.computeInterestInfo();
    }

    computeMonthlyPayment() {
        var q = Math.pow(1 + this.model.monthlyInterestRate, this.model.months);

        this.model.monthlyPayment = this.model.beginIn * this.model.monthlyInterestRate * q / (q - 1);
    }

    computeInterestInfo() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;

        this.model.dailyInterestRate = PacaRate.dailyRateByAnnual(this.model.annualInterestRate);
    }

}