import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PacaRate} from '../../finance/paca-rate';
import {Rate} from '../../finance/rate';
import {Locale} from '../../locale/locale';

@Component({
    templateUrl: 'build/pages/fixed-mortgage-payment/fixed-mortgage-payment.html'
})

export class FixedMortgagePayment extends Locale {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        super();
        this._navController = _navController;

        this.model = {
            beginIn: 123000,
            months: 24,
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
        this.computeMonthlyPayment();
        this.computeEndOutByMonthlyPayment();
        this.computeInterestInfo();
        this.computeMonthlyInterestRate();
    }

    computeMonthlyPayment() {
        var q = Math.pow(1 + this.model.monthlyInterestRate, this.model.months);

        this.model.monthlyPayment = this.model.beginIn * this.model.monthlyInterestRate * q / (q - 1);
    }

    computeEndOutByMonthlyPayment() {
        this.model.endOut = this.model.monthlyPayment * this.model.months;
    }

    computeMonthlyPaymentByEndOut() {
        this.model.monthlyPayment = this.model.endOut / this.model.months;
    }

    computeInterestInfo() {
        this.computeTotalInterestInfo();

        this.computeAnnualInterestInfo();

        this.computeMonthlyInterest();

        this.computeDailyInterestInfo();
    }

    computeDailyInterestInfo() {
        this.model.dailyInterest = this.model.totalInterest / (this.model.months * PacaRate.daysInAMonth);
        this.model.dailyInterestRate = this.model.dailyInterest / this.model.beginIn;
    }

    computeMonthlyInterest() {
        this.model.monthlyInterest = this.model.totalInterest / this.model.months;
    }

    computeAnnualInterestInfo() {
        this.model.annualInterest = this.model.totalInterest / (this.model.months / PacaRate.monthsInAYear);
        this.model.annualInterestRate = this.model.annualInterest / this.model.beginIn;
    }

    computeTotalInterestInfo() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;
    }

    months() {
        this.compute();
    }

    endOut() {
        this.model.monthlyPayment = Number(this.model.endOut) / Number(this.model.months);

        //https://www.zhihu.com/question/48132997
        this.computeInterestInfo();

        this.computeMonthlyInterestRate();
    }

    computeMonthlyInterestRate() {
        this.model.monthlyInterestRate = this.model.monthlyInterest / this.model.beginIn;
    }

    monthlyPayment() {
        this.computeEndOutByMonthlyPayment();
        this.computeInterestInfo();
        this.computeMonthlyInterestRate();
    }

    totalInterestRate() {
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOutByTotalInterest();

        this.computeMonthlyPaymentByEndOut();
        this.computeAnnualInterestInfo();
        this.computeMonthlyInterestInfo();
        this.computeDailyInterestInfo();
    }

    computeEndOutByTotalInterest() {
        this.model.endOut = this.model.beginIn + this.model.totalInterest;
    }

    computeMonthlyInterestInfo() {
        this.computeMonthlyInterest();
        this.computeMonthlyInterestRate();
    }

    totalInterest() {
        this.computeTotalInterestRateByTotalInterest();
        this.computeEndOutByTotalInterest();
        this.computeMonthlyPaymentByEndOut();
        this.computeAnnualInterestInfo();
        this.computeMonthlyInterestInfo();
        this.computeDailyInterestInfo();
    }

    computeTotalInterestRateByTotalInterest() {
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;
    }

    annualInterestRate() {
        this.model.annualInterest = this.model.beginIn * this.model.annualInterestRate;
        this.computeTotalInterestByAnnualInterest();

        this.computeTotalInterestRateByTotalInterest();

        this.computeEndOutByTotalInterest();
        this.computeMonthlyPaymentByEndOut();
        this.computeMonthlyInterestInfo();
        this.computeDailyInterestInfo();
    }

    computeTotalInterestByAnnualInterest() {
        this.model.totalInterest = this.model.annualInterest * (this.model.months / PacaRate.monthsInAYear);
    }

    annualInterest() {
        this.model.annualInterestRate = this.model.annualInterest / this.model.beginIn;
        this.computeTotalInterestByAnnualInterest();
        this.computeTotalInterestRateByTotalInterest();
        this.computeEndOutByTotalInterest();
        this.computeMonthlyPaymentByEndOut();
        this.computeMonthlyInterestInfo();
        this.computeDailyInterestInfo();
    }

    monthlyInterestRate() {
        this.model.monthlyInterest = this.model.beginIn * this.model.monthlyInterestRate;
        this.monthlyInterestRateGot();
    }

    monthlyInterestRateGot() {
        this.computeAnnualInterestInfoByMonthlyRate();

        this.computeTotalInterestByAnnualInterest();
        this.computeTotalInterestRateByTotalInterest();
        this.computeEndOutByTotalInterest();
        this.computeMonthlyPaymentByEndOut();
        this.computeDailyInterestInfo();
    }

    computeAnnualInterestInfoByMonthlyRate() {
        this.model.annualInterestRate = PacaRate.longRateOfShort(this.model.monthlyInterestRate, PacaRate.monthsInAYear);
        this.model.annualInterest = this.model.beginIn * this.model.annualInterestRate;
    }

    monthlyInterest() {
        this.model.monthlyInterestRate = this.model.monthlyInterest / this.model.beginIn;
        this.monthlyInterestRateGot();
    }

    dailyInterestRate() {
        this.model.dailyInterest = this.model.beginIn * this.model.dailyInterestRate;

        this.dailyInterestRateGot();
    }

    dailyInterestRateGot() {
        this.computeAnnualInterestInfoByDailyRate();
        this.computeTotalInterestByAnnualInterest();
        this.computeTotalInterestRateByTotalInterest();
        this.computeEndOutByTotalInterest();
        this.computeMonthlyInterestInfo();
        this.computeMonthlyPaymentByEndOut();
    }

    computeAnnualInterestInfoByDailyRate() {
        this.model.annualInterestRate = PacaRate.annualRateByDaily(this.model.dailyInterestRate);
        this.model.annualInterest = this.model.beginIn * this.model.annualInterestRate;
    }

    dailyInterest() {
        this.model.dailyInterestRate = this.model.dailyInterest / this.model.beginIn;
        this.dailyInterestRateGot();
    }
}