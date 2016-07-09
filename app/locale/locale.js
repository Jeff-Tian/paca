import {Config} from '../config/config';

export class Locale {
    __(key) {
        var locale = Config.get().locale || 'zh-CN';

        return Locale.resources[locale]
            ? (typeof Locale.resources[locale][key] === 'undefined'
                ? key
                : Locale.resources[locale][key]
        )
            : key;
    }

    static get resources() {
        return {
            'zh-CN': {},

            'en-US': {
                '设置': 'Settings',
                '啪咔，协助你比较不同的利率，划不划算，一目了然！': 'Paca let you compute and compare the different interest rates quickly!',
                '纯数字输入模式（不能输入%）': 'Pure number mode (% not allowed)',
                '简单模式 (年月日利率不使用复利模式)': 'Simplified mode (No complex rate)',
                '语言': 'Language',
                '联系我们': 'Contact us',
                '主页：': 'Home page: ',
                '源代码：': 'Source code: ',
                '等额本息': 'Fixed mortgage',
                '一次性还款借贷': 'One-off',
                '利率转换': 'Rate converter'
            }
        };
    }
}