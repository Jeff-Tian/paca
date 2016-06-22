import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/settings/settings.html'
})

export class Settings {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        this._navController = _navController;

        this.model = {
            numberMode: true
        };
    }
}
