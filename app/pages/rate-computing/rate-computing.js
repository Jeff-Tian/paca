import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

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
            interestRate: 0,
            interest: 0
        };
        this.source = null;
    }

    updateValues() {

    }

    changeSource(source) {
        this.source = source;
    }
}