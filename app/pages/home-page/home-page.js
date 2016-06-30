import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Settings} from '../settings/settings';
import {Rate} from '../../finance/rate';

@Component({
    templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        this._navController = _navController;
        this.model = {
            annualInterestRate: null,
            monthlyInterestRate: null,
            dailyInterestRate: null,

            simplifiedMode: Settings.get().simplifiedMode,
            numberMode: Settings.get().numberMode
        };

        this.numberFormat = {
            annualInterestRate: null,
            monthlyInterestRate: null,
            dailyInterestRate: null
        };

        this.percentFormat = {
            annualInterestRate: null,
            monthlyInterestRate: null,
            dailyInterestRate: null
        };

        this.thousandthFormat = {
            dailyInterestRate: null
        };

        this.tenThousandthFormat = {
            dailyInterestRate: null
        };

        this.source = '';

        let self = this;
        Settings.updated(function () {
            self.model.simplifiedMode = Settings.get().simplifiedMode;
            self.model.numberMode = Settings.get().numberMode;

            self.updateValues();
        });
    }

    shortRateOfLong(r, periods) {
        return this.model.simplifiedMode ? Rate.simpleShortRateOfLong(r, periods) : Rate.complexShortRateOfLong(r, periods);
    }

    longRateOfShort(r, periods) {
        return this.model.simplifiedMode ? Rate.simpleLongRateOfShort(r, periods) : Rate.complexLongRateOfShort(r, periods);
    }

    monthlyRateOfAnnual(r) {
        return this.shortRateOfLong(r, 12);
    }

    dailyRateOfAnnual(r) {
        return this.shortRateOfLong(r, 365);
    }

    annualRateOfMonthly(r) {
        return this.longRateOfShort(r, 12)
    }

    dailyRateOfMonthly(r) {
        return this.shortRateOfLong(r, 30);
    }

    annualRateOfDaily(r) {
        return this.longRateOfShort(r, 365);
    }

    monthlyRateOfDaily(r) {
        return this.longRateOfShort(r, 30);
    }

    annualInterestRateChanged() {
        let r = Rate.interpretInterestRate(this.model.annualInterestRate);
        this.model.monthlyInterestRate = this.monthlyRateOfAnnual(r);
        this.model.dailyInterestRate = this.dailyRateOfAnnual(r);
    }

    monthlyInterestRateChanged() {
        let r = Rate.interpretInterestRate(this.model.monthlyInterestRate);
        this.model.annualInterestRate = this.annualRateOfMonthly(r);
        this.model.dailyInterestRate = this.dailyRateOfMonthly(r);
    }

    dailyInterestRateChanged() {
        let r = Rate.interpretInterestRate(this.model.dailyInterestRate);
        this.model.annualInterestRate = this.annualRateOfDaily(r);
        this.model.monthlyInterestRate = this.monthlyRateOfDaily(r);
    }

    changeSource(theSource) {
        this.source = theSource;
    }

    updateDisplayFor(model) {
        var modelDisplays = Rate.getDisplayFormatsOf(Rate.interpretInterestRate(this.model[model]));

        this.numberFormat[model] = modelDisplays.numberFormat;
        this.percentFormat[model] = modelDisplays.percentFormat;
        this.thousandthFormat[model] = modelDisplays.thousandthFormat;
        this.tenThousandthFormat[model] = modelDisplays.tenThousandthFormat;
    }

    updateDisplay() {
        this.updateDisplayFor('annualInterestRate');
        this.updateDisplayFor('monthlyInterestRate');
        this.updateDisplayFor('dailyInterestRate');
    }

    updateValues() {
        if (typeof this[this.source] === 'function') {
            this[this.source]();

            this.updateDisplay();
        }
    }
}
