export class Rate {
    static simpleShortRateOfLong(r, periods) {
        return r / periods;
    }

    static complexShortRateOfLong(r, periods) {
        return Math.pow(1 + r, 1 / periods) - 1;
    }

    static simpleLongRateOfShort(r, periods) {
        return r * periods;
    }

    static complexLongRateOfShort(r, periods) {
        return Math.pow(1 + r, periods) - 1;
    }
}