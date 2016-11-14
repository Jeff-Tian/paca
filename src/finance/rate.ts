export class Rate {
    static simpleShortRateOfLong(r, periods) {
        return r / periods;
    }

    static complexShortRateOfLong(r, periods) {
        return Math.pow(1 + Number(r), 1 / periods) - 1;
    }

    static simpleLongRateOfShort(r, periods) {
        return r * periods;
    }

    static complexLongRateOfShort(r, periods) {
        return Math.pow(1 + Number(r), periods) - 1;
    }

    static interpretInterestRate(r) {
        if (!r) {
            return 0;
        }

        var result = parseFloat(r);

        for (var i = r.length - 1; i >= 0; i--) {
            if (r[i] !== '%') {
                break;
            }

            result /= 100;
        }

        return result;
    }

    static getDisplayFormatsOf(r) {
        r = Number(r);

        return {
            raw: r,
            numberFormat: r.toFixed(2),
            percentFormat: (r * 100).toFixed(2) + '%',
            thousandthFormat: (r * 1000).toFixed(2) + '%',
            tenThousandthFormat: (r * 10000).toFixed(2) + '%'
        };
    }
}