import {Rate} from './rate';
import {Config} from '../config/config';

export class PacaRate {
    static get monthsInAYear() {
        return 12;
    }

    static get daysInAYear() {
        return 365;
    }

    static get daysInAMonth() {
        return 30;
    }

    static shortRateOfLong(r, periods) {
        let m = Config.get().simplifiedMode ? Rate.simpleShortRateOfLong : Rate.complexShortRateOfLong;
        return m(r, periods);
    }

    static longRateOfShort(r, periods) {
        let m = Config.get().simplifiedMode ? Rate.simpleLongRateOfShort : Rate.complexLongRateOfShort;
        return m(r, periods);
    }

    static annualRateByMonthly(r) {
        return PacaRate.longRateOfShort(r, PacaRate.monthsInAYear);
    }

    static annualRateByDaily(r) {
        return PacaRate.longRateOfShort(r, PacaRate.daysInAYear);
    }

    static monthlyRateByAnnual(r) {
        return PacaRate.shortRateOfLong(r, PacaRate.monthsInAYear);
    }

    static monthlyRateByDaily(r) {
        return PacaRate.longRateOfShort(r, PacaRate.daysInAMonth);
    }

    static dailyRateByAnnual(r) {
        return PacaRate.shortRateOfLong(r, PacaRate.daysInAYear);
    }

    static dailyRateByMonthly(r) {
        return PacaRate.shortRateOfLong(r, PacaRate.daysInAMonth);
    }
}