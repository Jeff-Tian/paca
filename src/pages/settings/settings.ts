import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Locale} from '../../locale/locale';
import {Config} from '../../config/config';

@Component({
    selector: 'settings',
    templateUrl: 'settings.html',
})

export class Settings extends Locale {
    public model;

    constructor(public navCtrl: NavController, public platForm: Platform) {
        super();
        this.model = {
            numberMode: Config.get().numberMode,
            simplifiedMode: Config.get().simplifiedMode,
            locale: Config.get().locale || 'zh-CN'
        };
        this.platForm = platForm;
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

    hideAppDownloadInfo() {
        return this.platForm.is('android') || this.platForm.is('ios');
    }
}
