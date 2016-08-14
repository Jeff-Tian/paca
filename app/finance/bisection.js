/**
 *
 * Let q = (1+i_m), p = 1/q, then
 *
 * A*q^{n+1} - (A+a) * q^n + a = 0
 *
 * Let f(q)     = A*q^{n+1} - (A+a) * q^n + a
 * then f`(q)   = A*(n+1)*q^n - (A+a)*n*q^{n-1}
 *
 * Use Newton's way to find the root for the above equation
 *
 */

export class Bisection {
    static f(q, n, A, a) {
        return A * Math.pow(q, n + 1) - (A + a) * Math.pow(q, n) + a;
    }

    static f_(q, n, A, a) {
        return A * (n - 1) * Math.pow(q, n) - (A + a) * n * Math.pow(q, n - 1);
    }

    static findRootOfQ(A, a, n) {
        var delta = 0.00001;
        var maxIter = 10000;
        var x1 = 1;
        var x2 = 2;

        var counter = 0;
        var q = 0;
        while (counter < maxIter) {
            counter++;
            var newQ = (x1 + x2) / 2;

            if (q === newQ) {
                console.log('q not improved with ', q);
                console.log('f(q) = ', Bisection.f(q, n, A, a));

                return q;
            }

            q = newQ;
            console.log('q = ', q);
            var f = Bisection.f(q, n, A, a);

            if (f === 0 || Math.abs(f) < delta) {
                console.log('found q = ', q);
                console.log('f(q) = ', f);
                return q;
            } else if (f > 0) {
                x2 = q;
            } else {
                x1 = q;
            }
        }

        console.log('max iter with q = ', q);
        console.log('f(q) = ', Bisection.f(q, n, A, a));
        return q;
    }

    static findMonthlyInterestRate(A, a, n) {
        var q = Bisection.findRootOfQ(A, a, n);

        return q - 1;
    }
}