import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";
import {TxnValueUtils} from "@/models/curr_pairs/txns/TxnValue";
import type {CurrPairBalance} from "@/models/curr_pairs/CurrPairBalance";

export class CurrPairBalanceMerger {
    constructor(private readonly a: CurrPairBalance, private readonly b: CurrPairBalance) {
    }

    public merge() {
        const result: CurrPairBalance = {
            values: [...this.a.values]
        };
        this.b.values.forEach(value => {
            const duplicate = this.getDuplicate(result.values, value);
            if (!duplicate) {
                result.values.push(value);
            } else if(TxnValueUtils.isOpen(duplicate)) {
                duplicate.to = value.to;
            }
        });
        result.values = result.values.sort((a, b) => a.ts.getTime() - b.ts.getTime());
        return result;
    }

    private getDuplicate(original: TxnValue[], other: TxnValue) {
        return original.find(value => TxnValueUtils.equals(value, other));
    }
}