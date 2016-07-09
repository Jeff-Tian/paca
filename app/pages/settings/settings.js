import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Locale} from '../../locale/locale';
import {Config} from '../../config/config';

@Component({
    templateUrl: 'build/pages/settings/settings.html'
})


export class Settings extends Locale {
    static get parameters() {
        return [[NavController]];
    }

    constructor(_navController) {
        super();
        this._navController = _navController;

        this.model = {
            numberMode: Config.get().numberMode,
            simplifiedMode: Config.get().simplifiedMode,
            locale: Config.get().locale || 'zh-CN'
        };
    }

    static save(settings) {
        return Config.save(settings);
    }

    static get() {
        return Config.get();
    }

    static updated(callback) {
        return Config.updated(callback);
    }

    saveSettings() {
        return Config.saveSettings(this.model);
    }

    localeChanged() {
        return Config.saveSettings(this.model);
    }
}
