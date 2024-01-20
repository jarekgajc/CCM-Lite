import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";
import {TxnValueUtils} from "@/models/curr_pairs/txns/TxnValue";

export class TxnFxBuilder {
    private readonly a;
    private readonly b;

    constructor(a: TxnValue[], b: TxnValue[]) {
        this.a = this.initTxnValues(a);
        this.b = this.initTxnValues(b);
    }

    private initTxnValues(values: TxnValue[]): TxnValue[] {
        return values.filter(value => TxnValueUtils.isOpen(value));
    }

    public build(): TxnValue[] {
        const result: TxnValue[] = [];
        this.a.forEach(a => {
            const b = findItemByDate(this.b, a.ts);
            if(b !== undefined) {
                result.push({...a, to: b.value});
            }
        });
        return result;
    }
}

function findItemByDate(array: TxnValue[], targetDate: Date): TxnValue | undefined {
    const toleranceMilliseconds = 5000; // 5 seconds in milliseconds

    // Use Array.prototype.find() to find the item within the tolerance
    return array.find(item => {
        const itemDate = new Date(item.ts);

        // Calculate the difference in milliseconds between the targetDate and itemDate
        const timeDifference = Math.abs(targetDate.getTime() - itemDate.getTime());

        // Check if the time difference is within the tolerance
        return timeDifference <= toleranceMilliseconds;
    });
}