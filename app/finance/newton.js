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

export class Newton {
    static f(q, n, A, a) {
        return A * Math.pow(q, n + 1) - (A + a) * Math.pow(q, n) + a;
    }

    static f_(q, n, A, a) {
        return A * (n - 1) * Math.pow(q, n) - (A + a) * n * Math.pow(q, n - 1);
    }

    static findRootOfQ(A, a, n) {
        var guess = 1.5;
        console.log('first = ', guess);
        var delta = 50;

        var sigmaF = Newton.f(guess, n, A, a);
        console.log('f = ', sigmaF);

        while (Math.abs(sigmaF) > delta) {
            console.log('guess = ', guess);
            console.log('sigmaF =', sigmaF);
            guess = guess - sigmaF / Newton.f_(guess, n, A, a);

            sigmaF = Newton.f(guess, n, A, a);
        }

        console.log('guess = ', guess);
        console.log('sigmaF = ', sigmaF);

        return guess;
    }

    static findMonthlyInterestRate(A, a, n) {
        var q = Newton.findRootOfQ(A, a, n);

        return q - 1;
    }
}