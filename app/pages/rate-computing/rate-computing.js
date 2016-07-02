import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Settings} from '../settings/settings';
import {Rate} from '../../finance/rate';

@Component({
    templateUrl: 'build/pages/rate-computing/rate-computing.html'
})
export class RateComputing {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        this._navControler = _navController;

        this.payBackMethods = [{
            key: 'one-off',
            value: '到期一次性还本付息'
        }, {
            key: 'fixed-mortgage',
            value: '等额本息'
        }];

        this.model = {
            beginIn: 10000,
            duration: 12,
            endOut: 11000,
            payBackMethod: 'one-off',
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
        this.computeInterestForOneOff();
    }

    computeInterestForOneOff() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;

        this.computeAvgMonthlyInterestForOneOff();
        this.computeAvgAnnualInterestForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    computeAvgMonthlyInterestForOneOff() {
        this.getAvgMonthlyInterestByTotalForOneOff();
        this.getAvgMonthlyInterestRateByTotalForOneOff();
    }

    getAvgMonthlyInterestRateByTotalForOneOff() {
        this.model.monthlyInterestRate = Settings.get().simplifiedMode ? Rate.simpleShortRateOfLong(this.model.totalInterestRate, this.model.duration) : Rate.complexShortRateOfLong(this.model.totalInterestRate, this.model.duration);
    }

    reverseToTotalRateByAvgMonthlyRateForOneOff() {
        this.model.totalInterestRate = RateComputing.longRateOfShort(this.model.monthlyInterestRate, this.model.duration);
    }

    static longRateOfShort(r, duration) {
        return Settings.get().simplifiedMode ? Rate.simpleLongRateOfShort(r, duration) : Rate.complexLongRateOfShort(r, duration);
    }

    reverseToTotalRateByAvgDailyMonthlyRateForOneOff() {
        this.model.totalInterestRate = RateComputing.longRateOfShort(this.model.dailyInterestRate, this.model.duration * 30);
    }

    getAvgMonthlyInterestByTotalForOneOff() {
        this.model.monthlyInterest = this.model.totalInterest / this.model.duration;
    }

    reverseToTotalByAvgMonthlyForOneOff() {
        this.model.totalInterest = this.model.monthlyInterest * this.model.duration;
    }

    computeAvgDailyInterestForOneOff() {
        this.getDailyInterestByTotalForOneOff();
        this.getDailyInterestRateByTotalRateForOneOff();
    }

    getDailyInterestRateByTotalRateForOneOff() {
        this.model.dailyInterestRate = RateComputing.shortRateOfLong(this.model.totalInterestRate, this.model.duration * 30);
    }

    static shortRateOfLong(r, duration) {
        return Settings.get().simplifiedMode ? Rate.simpleShortRateOfLong(r, duration) : Rate.complexShortRateOfLong(r, duration);
    }

    getDailyInterestByTotalForOneOff() {
        this.model.dailyInterest = this.model.totalInterest / (this.model.duration * 30);
    }

    reverseToTotalInterestByDailyForOneOff() {
        this.model.totalInterest = this.model.dailyInterest * (this.model.duration * 30);
    }

    computeAvgAnnualInterestForOneOff() {
        this.convertToAnnualFromTotalForOneOff();
    }

    convertToAnnualFromTotalForOneOff() {
        this.getAvgAnnualInterestByTotalForOneOff();
        this.getAvgAnnualInterestRateByTotalForOneOff();
    }

    getAvgAnnualInterestRateByTotalForOneOff() {
        this.model.annualInterestRate = Settings.get().simplifiedMode ? Rate.simpleShortRateOfLong(this.model.totalInterestRate, this.model.duration / 12) : Rate.complexShortRateOfLong(this.model.totalInterestRate, this.model.duration / 12);
    }

    getAvgAnnualInterestByTotalForOneOff() {
        this.model.annualInterest = this.model.totalInterest / (this.model.duration / 12);
    }

    reverseToTotalFromAnnualForOneOff() {
        this.model.totalInterestRate = Settings.get().simplifiedMode ? Rate.simpleLongRateOfShort(this.model.annualInterestRate, this.model.duration / 12) : Rate.complexLongRateOfShort(this.model.annualInterestRate, this.model.duration / 12);
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
    }

    duration() {
        this.computeInterestForOneOff();
    }

    endOut() {
        this.computeInterestForOneOff();
    }

    totalInterestRate() {
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOut();

        this.computeAvgAnnualInterestForOneOff();
        this.computeAvgMonthlyInterestForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    totalInterest() {
        this.computeEndOut();
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;

        this.computeAvgAnnualInterestForOneOff();
        this.computeAvgMonthlyInterestForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    annualInterestRate() {
        this.reverseToTotalFromAnnualForOneOff();
        this.computeEndOut();
        this.getAvgAnnualInterestByTotalForOneOff();
        this.computeAvgMonthlyInterestForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    annualInterest() {
        this.model.totalInterest = this.model.annualInterest * (this.model.duration / 12);
        this.computeEndOut();
        this.computeInterestForOneOff();
        this.getAvgAnnualInterestRateByTotalForOneOff();
        this.computeAvgMonthlyInterestForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    monthlyInterestRate() {
        this.reverseToTotalRateByAvgMonthlyRateForOneOff();
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOut();
        this.computeAvgAnnualInterestForOneOff();
        this.getAvgMonthlyInterestByTotalForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    monthlyInterest() {
        this.reverseToTotalByAvgMonthlyForOneOff();
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;
        this.computeEndOut();
        this.computeAvgAnnualInterestForOneOff();
        this.getAvgMonthlyInterestRateByTotalForOneOff();
        this.computeAvgDailyInterestForOneOff();
    }

    computeEndOut() {
        this.model.endOut = Number(this.model.beginIn) + Number(this.model.totalInterest);
    }

    dailyInterestRate() {
        this.reverseToTotalRateByAvgDailyMonthlyRateForOneOff();
        this.model.totalInterest = this.model.beginIn * this.model.totalInterestRate;
        this.computeEndOut();

        this.computeAvgAnnualInterestForOneOff();
        this.computeAvgMonthlyInterestForOneOff();
        this.getDailyInterestByTotalForOneOff();
    }

    dailyInterest() {
        this.reverseToTotalInterestByDailyForOneOff();
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;
        this.computeEndOut();

        this.computeAvgAnnualInterestForOneOff();
        this.computeAvgMonthlyInterestForOneOff();
        this.getDailyInterestRateByTotalRateForOneOff();
    }
}