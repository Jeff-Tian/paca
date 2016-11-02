import {IndexedDB} from './index.db';

export class DB {
}

DB.cashFlow = new IndexedDB('cashFlow');
DB.income = new IndexedDB('income');
DB.payout = new IndexedDB('payout');