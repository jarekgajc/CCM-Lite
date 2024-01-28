import type { Curr } from "@/models/Curr";
import { CurrPair, CurrPairUtils } from "@/models/curr_pairs/CurrPair";
import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import { type TxnValue, TxnValueUtils } from "@/models/curr_pairs/txns/TxnValue";
import { MapUtils } from "./MapUtils";
import { TxnValueMatcher } from "./TxnValueMatcher";

export class ExchangeTxnValuesConverter {
    constructor(private readonly exchangeTxnValues: ExchangeTxnValue[]) {
        console.log(exchangeTxnValues);
    }

    toMap() {
        return this.createMap(this.createValuesByCurr());
    }

    private createMap(valuesByCurr: Map<Curr, ExchangeTxnValue[]>) {
        const result = new Map<CurrPair, TxnValue[]>();
        const keys = [...valuesByCurr.keys()];
        keys.forEach(curr => {
            const range = keys.filter(key => CurrPairUtils.fromCurrs(curr, key) !== undefined).flatMap(key => [...valuesByCurr.get(key)!]);
            const matcher = new TxnValueMatcher(range);

            [...valuesByCurr.get(curr)!].forEach(value => {
                const match = matcher.match(value);
                if (match) {
                    const currPair = CurrPairUtils.fromCurrs(curr, match.curr);
                    if (currPair) {
                        const txnValue = TxnValueUtils.copy(value);
                        txnValue.to = match.from;
                        MapUtils.getOrAdd(result, currPair, []).push(txnValue);
                    }
                }
            });
        });
        return result;
    }

    private createValuesByCurr() {
        const valuesByCurr = new Map<Curr, ExchangeTxnValue[]>();
        for (let i = 0; i < this.exchangeTxnValues.length; i++) {
            const exchangeTxnValue = this.exchangeTxnValues[i];
            MapUtils.getOrAdd(valuesByCurr, exchangeTxnValue.curr, []).push(exchangeTxnValue);
        }
        return valuesByCurr;
    }
}