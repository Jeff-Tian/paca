export class Config {
    static save(settings) {
        var oldSettings = Config.get();

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
        let originalSave = Config.save;
        Config.save = function (settings) {
            originalSave(settings);
            callback();
        };
    }

    static saveSettings(model) {
        Config.save(model);
    }
}