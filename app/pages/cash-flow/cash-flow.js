import {Component} from '@angular/core';
import {NavController} from     'ionic-angular';
import {Config} from '../../config/config';
import {Locale} from '../../locale/locale';
import {DB} from '../../db/db';

@Component({
    templateUrl: 'build/pages/cash-flow/cash-flow.html'
})

export class CashFlow extends Locale {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        super();
        this._navController = _navController;

        DB.cashFlow.getAll(function (data) {
            this.flows = data;
        });
    }
}