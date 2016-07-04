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
            monthlyInterestRate: 0.01,
            monthlyInterest: 0,
            annualInterestRate: 0,
            annualInterest: 0,
            dailyInterestRate: 0,
            dailyInterest: 0,
            monthlyPayment: 0
        };

        this.displays = {
            totalInterestRate: {},
            annualInterestRate: {},
            monthlyInterestRate: {},
            dailyInterestRate: {}
        };

        this.source = 'beginIn';

        this.updateValues();
    }

    updateValues() {
        if (typeof this[this.source] === 'function') {
            console.log(this.source);
            this[this.source]();
            this.updateDisplays();
        }
    }

    updateDisplays() {
        this.displays.totalInterestRate = Rate.getDisplayFormatsOf(this.model.totalInterestRate);
        this.displays.annualInterestRate = Rate.getDisplayFormatsOf(this.model.annualInterestRate);
        this.displays.monthlyInterestRate = Rate.getDisplayFormatsOf(this.model.monthlyInterestRate);
        this.displays.dailyInterestRate = Rate.getDisplayFormatsOf(this.model.dailyInterestRate);
    }

    changeSource(source) {
        this.source = source;
    }

    beginIn() {
        this.compute();
    }

    /**
     * A(1+i_m)^n=a*((1+i_m)^n-1)/i_m
     *
     * Let q = (1+i_m)^n, p = (1+i_m),
     *
     * Aq=a(q-1)/(p-1)
     *
     * Aq(p-1)=aq-a
     * Ap^(n+1) - (A-a)p^n + a = 0
     */
    compute() {
        var q = Math.pow(1 + this.model.monthlyInterestRate, this.model.duration);

        this.model.monthlyPayment = this.model.beginIn * this.model.monthlyInterestRate * q / (q - 1);
        this.computeEndOut();
        this.computeInterestInfo();
    }

    computeEndOut() {
        this.model.endOut = this.model.monthlyPayment * this.model.duration;
    }

    computeInterestInfo() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;

        this.model.annualInterest = this.model.totalInterest / (this.model.duration / 12);
        this.model.annualInterestRate = this.model.annualInterest / this.model.beginIn;

        this.model.monthlyInterest = this.model.totalInterest / this.model.duration;

        this.model.dailyInterest = this.model.totalInterest / (this.model.duration * 30);
        this.model.dailyInterestRate = this.model.dailyInterest / this.model.beginIn;
    }

    duration() {
        this.compute();
    }

    endOut() {
        this.model.monthlyPayment = Number(this.model.endOut) / Number(this.model.duration);

        //https://www.zhihu.com/question/48132997
        this.computeInterestInfo();

        this.computeMonthlyInterestRate();
    }

    computeMonthlyInterestRate() {
        this.model.monthlyInterestRate = this.model.monthlyInterest / this.model.beginIn;
    }

    monthlyPayment() {
        this.computeEndOut();
        this.computeInterestInfo();
        this.computeMonthlyInterestRate();
    }
}