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
            numberMode: Settings.get().numberMode
        };
    }

    static save(settings) {
        settings = settings || {};
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    static get() {
        try {
            return JSON.parse(localStorage.getItem('settings'));
        } catch (ex) {
            return {};
        }
    }

    static updated(callback) {
        let originalSave = Settings.save;
        Settings.save = function (settings) {
            originalSave(settings);
            callback();
        };
    }

    saveSettings() {
        Settings.save(this.model);
    }
}
