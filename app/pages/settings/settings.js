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
            numberMode: Settings.get().numberMode,
            simplifiedMode: Settings.get().simplifiedMode,
            locale: Settings.get().locale || 'zh-CN'
        };
    }

    static save(settings) {
        var oldSettings = Settings.get();

        settings = settings || {};
        localStorage.setItem('settings', JSON.stringify(Object.assign({}, oldSettings, settings)));
    }

    static get() {
        try {
            return JSON.parse(localStorage.getItem('settings')) || {
                    simplifiedMode: true,
                    numberMode: false
                };
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
