import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Settings} from '../settings/settings';

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
            numberMode: Settings.get().simplifiedMode
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

        this.source = '';

        let self = this;
        Settings.updated(function () {
            self.model.simplifiedMode = Settings.get().simplifiedMode;
            self.model.numberMode = Settings.get().numberMode;
        });
    }

    static interpretInterestRate(r) {
        if (!r) {
            return 0;
        }

        var result = parseFloat(r);

        for (var i = r.length - 1; i >= 0; i--) {
            if (r[i] !== '%') {
                break;
            }

            result /= 100;
        }

        return result;
    }

    shortRateOfLong(r, periods) {
        function simple(r) {
            return r / periods;
        }

        function complex(r) {
            return Math.pow(1 + r, 1 / periods) - 1;
        }

        return this.model.simplifiedMode ? simple(r) : complex(r);
    }

    longRateOfShort(r, periods) {
        function simple(r) {
            return r * periods;
        }

        function complex(r) {
            return Math.pow(1 + r, periods) - 1;
        }

        return this.model.simplifiedMode ? simple(r) : complex(r);
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
        let r = HomePage.interpretInterestRate(this.model.annualInterestRate);
        this.model.monthlyInterestRate = this.monthlyRateOfAnnual(r);
        this.model.dailyInterestRate = this.dailyRateOfAnnual(r);
    }

    monthlyInterestRateChanged() {
        let r = HomePage.interpretInterestRate(this.model.monthlyInterestRate);
        this.model.annualInterestRate = this.annualRateOfMonthly(r);
        this.model.dailyInterestRate = this.dailyRateOfMonthly(r);
    }

    dailyInterestRateChanged() {
        let r = HomePage.interpretInterestRate(this.model.dailyInterestRate);
        this.model.annualInterestRate = this.annualRateOfDaily(r);
        this.model.monthlyInterestRate = this.monthlyRateOfDaily(r);
    }

    changeSource(theSource) {
        this.source = theSource;
    }

    updateDisplayFor(model) {
        let r = HomePage.interpretInterestRate(this.model[model]);
        this.numberFormat[model] = r.toFixed(2);
        this.percentFormat[model] = (r * 100).toFixed(2) + '%';
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
