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
            annualInterest: 0
        };
        this.source = null;

        this.beginIn();
    }

    updateValues() {
        if (typeof this[this.source] === 'function') {
            this[this.source]();
        }
    }

    changeSource(source) {
        this.source = source;
    }

    beginIn() {
        this.model.totalInterest = this.model.endOut - this.model.beginIn;
        this.model.totalInterestRate = this.model.totalInterest / this.model.beginIn;

        this.model.monthlyInterest = this.model.totalInterest / this.model.duration;
        this.model.monthlyInterestRate = Settings.get().simplifiedMode ? Rate.simpleShortRateOfLong(this.model.totalInterestRate, this.model.duration) : Rate.complexShortRateOfLong(this.model.totalInterestRate, this.model.duration);
    }
}