import {TxnValueUtils} from "@/models/curr_pairs/txns/TxnValue";
import type {CurrPairBalance} from "@/models/curr_pairs/CurrPairBalance";
import { TxnValueMatcher } from "./TxnValueMatcher";

export class CurrPairBalanceMerger {
    constructor(private readonly a: CurrPairBalance, private readonly b: CurrPairBalance) {
    }

    public merge() {
        const result: CurrPairBalance = {
            values: [...this.a.values]
        };

        const matcher = new TxnValueMatcher(result.values);
        this.b.values.forEach(value => {
            const duplicate = matcher.match(value);
            if (!duplicate) {
                result.values.push(value);
            } else if(TxnValueUtils.isOpen(duplicate)) {
                duplicate.to = value.to;
            }
        });
        result.values = result.values.sort((a, b) => a.ts.getTime() - b.ts.getTime());
        return result;
    }
}