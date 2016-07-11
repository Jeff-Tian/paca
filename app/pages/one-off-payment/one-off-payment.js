import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Config} from '../../config/config';
import {Rate} from '../../finance/rate';
import {Locale} from '../../locale/locale';

@Component({
    templateUrl: 'build/pages/one-off-payment/one-off-payment.html'
})
export class OneOffPayment extends Locale {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        super();
        this._navControler = _navController;

        this.model = {
            beginIn: 10000,
            months: 12,
            endOut: 11000,
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
            annualInterestRate: {},
            monthlyInterestRate: {},
            dailyInterestRate: {}
        };

        this.source = 'beginIn';

        this.updateValues();
    }

    updateValues() {
        if (typeof this[this.source] === 'function') {
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
        this.computeInterest();
    }

    computeInterest() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;

        this.computeAvgMonthlyInterest();
        this.computeAvgAnnualInterest();
        this.computeAvgDailyInterest();
    }

    computeAvgMonthlyInterest() {
        this.getAvgMonthlyInterestByTotal();
        this.getAvgMonthlyInterestRate();
    }

    getAvgMonthlyInterestRate() {
        this.model.monthlyInterestRate = Config.get().simplifiedMode ? Rate.simpleShortRateOfLong(this.model.totalInterestRate, this.model.months) : Rate.complexShortRateOfLong(this.model.totalInterestRate, this.model.months);
    }

    reverseToTotalRateByAvgMonthlyRate() {
        this.model.totalInterestRate = OneOffPayment.longRateOfShort(this.model.monthlyInterestRate, this.model.months);
    }

    static longRateOfShort(r, duration) {
        return Config.get().simplifiedMode ? Rate.simpleLongRateOfShort(r, duration) : Rate.complexLongRateOfShort(r, duration);
    }

    reverseToTotalRateByAvgDailyMonthlyRate() {
        this.model.totalInterestRate = OneOffPayment.longRateOfShort(this.model.dailyInterestRate, this.model.months * 30);
    }

    getAvgMonthlyInterestByTotal() {
        this.model.monthlyInterest = this.model.totalInterest / this.model.months;
    }

    reverseToTotalByAvgMonthly() {
        this.model.totalInterest = this.model.monthlyInterest * this.model.months;
    }

    computeAvgDailyInterest() {
        this.getDailyInterestByTotal();
        this.getDailyInterestRateByTotalRate();
    }

    getDailyInterestRateByTotalRate() {
        this.model.dailyInterestRate = OneOffPayment.shortRateOfLong(this.model.totalInterestRate, this.model.months * 30);
    }

    static shortRateOfLong(r, duration) {
        return Config.get().simplifiedMode ? Rate.simpleShortRateOfLong(r, duration) : Rate.complexShortRateOfLong(r, duration);
    }

    getDailyInterestByTotal() {
        this.model.dailyInterest = this.model.totalInterest / (this.model.months * 30);
    }

    reverseToTotalInterestByDaily() {
        this.model.totalInterest = this.model.dailyInterest * (this.model.months * 30);
    }

    computeAvgAnnualInterest() {
        this.convertToAnnualFromTotal();
    }

    convertToAnnualFromTotal() {
        this.getAvgAnnualInterestByTotal();
        this.getAvgAnnualInterestRateByTotalForOneOff();
    }

    getAvgAnnualInterestRateByTotalForOneOff() {
        this.model.annualInterestRate = Config.get().simplifiedMode ? Rate.simpleShortRateOfLong(this.model.totalInterestRate, this.model.months / 12) : Rate.complexShortRateOfLong(this.model.totalInterestRate, this.model.months / 12);
    }

    getAvgAnnualInterestByTotal() {
        this.model.annualInterest = this.model.totalInterest / (this.model.months / 12);
    }

    reverseToTotalFromAnnualForOneOff() {
        this.model.totalInterestRate = Config.get().simplifiedMode ? Rate.simpleLongRateOfShort(this.model.annualInterestRate, this.model.months / 12) : Rate.complexLongRateOfShort(this.model.annualInterestRate, this.model.months / 12);
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
    }

    months() {
        this.computeInterest();
    }

    endOut() {
        this.computeInterest();
    }

    totalInterestRate() {
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOut();

        this.computeAvgAnnualInterest();
        this.computeAvgMonthlyInterest();
        this.computeAvgDailyInterest();
    }

    totalInterest() {
        this.computeEndOut();
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;

        this.computeAvgAnnualInterest();
        this.computeAvgMonthlyInterest();
        this.computeAvgDailyInterest();
    }

    annualInterestRate() {
        this.reverseToTotalFromAnnualForOneOff();
        this.computeEndOut();
        this.getAvgAnnualInterestByTotal();
        this.computeAvgMonthlyInterest();
        this.computeAvgDailyInterest();
    }

    annualInterest() {
        this.model.totalInterest = this.model.annualInterest * (this.model.months / 12);
        this.computeEndOut();
        this.computeInterest();
        this.getAvgAnnualInterestRateByTotalForOneOff();
        this.computeAvgMonthlyInterest();
        this.computeAvgDailyInterest();
    }

    monthlyInterestRate() {
        this.reverseToTotalRateByAvgMonthlyRate();
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOut();
        this.computeAvgAnnualInterest();
        this.getAvgMonthlyInterestByTotal();
        this.computeAvgDailyInterest();
    }

    monthlyInterest() {
        this.reverseToTotalByAvgMonthly();
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;
        this.computeEndOut();
        this.computeAvgAnnualInterest();
        this.getAvgMonthlyInterestRate();
        this.computeAvgDailyInterest();
    }

    computeEndOut() {
        this.model.endOut = Number(this.model.beginIn) + Number(this.model.totalInterest);
    }

    dailyInterestRate() {
        this.reverseToTotalRateByAvgDailyMonthlyRate();
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOut();

        this.computeAvgAnnualInterest();
        this.computeAvgMonthlyInterest();
        this.getDailyInterestByTotal();
    }

    dailyInterest() {
        this.reverseToTotalInterestByDaily();
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;
        this.computeEndOut();

        this.computeAvgAnnualInterest();
        this.computeAvgMonthlyInterest();
        this.getDailyInterestRateByTotalRate();
    }
}