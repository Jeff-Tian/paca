import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Config} from '../../config/config';
import {Rate} from '../../finance/rate';
import {PacaRate} from '../../finance/paca-rate';

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
            annualInterestRate: '12%',
            monthlyInterestRate: null,
            dailyInterestRate: null,

            simplifiedMode: Config.get().simplifiedMode,
            numberMode: Config.get().numberMode
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
        Config.updated(function () {
            self.model.simplifiedMode = Config.get().simplifiedMode;
            self.model.numberMode = Config.get().numberMode;

            self.updateValues();
        });

        this.annualInterestRateChanged();
    }

    annualInterestRateChanged() {
        let r = Rate.interpretInterestRate(this.model.annualInterestRate);
        this.model.monthlyInterestRate = PacaRate.monthlyRateByAnnual(r);
        this.model.dailyInterestRate = PacaRate.dailyRateByAnnual(r);
    }

    monthlyInterestRateChanged() {
        let r = Rate.interpretInterestRate(this.model.monthlyInterestRate);
        this.model.annualInterestRate = PacaRate.annualRateByMonthly(r);
        this.model.dailyInterestRate = PacaRate.dailyRateByMonthly(r);
    }

    dailyInterestRateChanged() {
        let r = Rate.interpretInterestRate(this.model.dailyInterestRate);
        this.model.annualInterestRate = PacaRate.annualRateByDaily(r);
        this.model.monthlyInterestRate = PacaRate.monthlyRateByDaily(r);
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
