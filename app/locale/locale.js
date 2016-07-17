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
                '利率转换': 'Rate converter',
                '到期一次性还款借贷': 'One-time payment due loan',
                '期初借入(元):': 'Borrow ($):',
                '期初借入 xxx 元': 'Borrow xxx dollars',
                '借款期限(月):': 'Duration (months):',
                '借款期限 xx 月': 'Duration in months',
                '总还款额(元):': 'Total payments ($):',
                '共需还款 xxx 元': 'Need to pay xxx dollars back',
                '总利率:': 'Total Interest Rate: ',
                '总利率': 'Total Interest Rate',
                '总利息:': 'Total Interests: ',
                '总利息': 'Total Interests',
                '平均年利率:': 'Average Annual Interest Rate: ',
                '平均年利率': 'Average Annual Interest Rate',
                '平均年利息:': 'Average Annual Interests: ',
                '平均年利息': 'Average Annual Interests',
                '平均月利率:': 'Average Monthly Interest Rate: ',
                '平均月利率': 'Average Monthly Interest Rate',
                '平均月利息:': 'Average Monthly Interests: ',
                '平均月利息': 'Average Monthly Interests',
                '平均日利率:': 'Average Daily Interest Rate: ',
                '平均日利率': 'Average Daily Interest Rate',
                '平均日利息:': 'Average Daily Interests: ',
                '平均日利息': 'Average Daily Interests',
                '月还款额: ': 'Monthly payment: ',
                '月还款额 xxx 元': 'Pay xxx dollars monthly',
                '年利率:': 'Annual Interest Rate:',
                '年利率': "Annual Interest Rate",
                '月利率:': 'Monthly Interest Rate:',
                '月利率': 'Monthly Interest Rate',
                '日利率:': 'Daily Interest Rate:',
                '日利率': 'Daily Interest Rate:',
                '按月等额本息': 'Fixed Mortgage',
                '到期一次还本付息': 'One off repayment'
            }
        };
    }
}