import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";
import type {TxnPairInfo} from "@/models/curr_pairs/txns/TxnPairInfo";
import type {TxnBalance} from "@/models/curr_pairs/txns/TxnBalance";
import type {TxnLeftValue} from "@/models/curr_pairs/txns/TxnLeftValue";

export type TxnBalanceBuilderResponse = {
    aLeftValues: TxnLeftValue[];
    bLeftValues: TxnLeftValue[];
    txnBalances: TxnBalance[];
};

export class TxnBalanceBuilder {
    aTxnValues: (TxnValue & {fx: number})[];
    bTxnValues: (TxnValue & {fx: number})[];
    bValues: number[];
    txnPairInfos: TxnPairInfo[] = [];
    aLeftValues: TxnLeftValue[] = [];
    bLeftValues: TxnLeftValue[] = [];
    txnBalances: TxnBalance[] = [];

    constructor(values: TxnValue[]) {
        console.log(values)
        this.aTxnValues = values
            .filter(value => value.to >= 0)
            .map(value => ({...value, fx: Math.abs(value.value / value.to)}))
            .sort((a, b) => b.fx - a.fx);
        this.bTxnValues = values
            .filter(value => value.to < 0)
            .map(value => ({...value, fx: Math.abs(value.value / value.to)}))
            .sort((a, b) => b.fx - a.fx);

        this.bValues = this.bTxnValues.map(value => -value.to);
    }

    public build(): TxnBalanceBuilderResponse {
        this.buildTxnPairInfos();
        this.buildTxnBalances();
        this.buildLeftBValues();

        console.log(this.aTxnValues, this.bTxnValues)
        console.log(this.txnPairInfos)
        console.log(this.txnBalances)
        console.log(this.aLeftValues)
        console.log(this.bLeftValues)
        console.log("----------------------------")

        return {
            txnBalances: this.txnBalances,
            aLeftValues: this.aLeftValues,
            bLeftValues: this.bLeftValues,
        };
    }

    private buildTxnPairInfos() {
        for (let i = this.aTxnValues.length - 1; i >= 0; i--) {
            const aTxnValue = this.aTxnValues[i];
            const txnPairInfo: TxnPairInfo = {
                value: aTxnValue.to,
                fx: aTxnValue.fx,
                others: []
            };
            let aValue = aTxnValue.to;
            for (let j = 0; j < this.bTxnValues.length; j++) {
                const bTxnValue = this.bTxnValues[j];
                if (aTxnValue.fx < bTxnValue.fx) {
                    const diff = aValue - this.bValues[j];
                    if (diff > 0) {
                        txnPairInfo.others.push({
                            value: this.bValues[j],
                            fx: bTxnValue.fx ?? 0
                        });
                        this.bValues[j] = 0;
                        aValue = diff;
                    } else {
                        txnPairInfo.others.push({
                            value: aValue,
                            fx: bTxnValue.fx ?? 0
                        });
                        this.bValues[j] = -diff;
                        aValue = 0;
                        break;
                    }
                }
            }
            this.txnPairInfos.push(txnPairInfo);
        }
    }

    private buildTxnBalances() {
        for (let i = 0; i < this.txnPairInfos.length; i++) {
            const txnPairInfo = this.txnPairInfos[i];
            if (!txnPairInfo.others.length) {
                this.aLeftValues.push({
                    value: this.aTxnValues[i].value,
                    fx: this.aTxnValues[i].fx,
                    ts: this.aTxnValues[i].ts
                });
            } else {
                const value = txnPairInfo.others.reduce((accumulator, current) => {
                    return accumulator + current.value;
                }, 0);
                if (value < txnPairInfo.value) {
                    const notFulfilled = txnPairInfo.value - value;
                    this.aLeftValues.push({
                        value: notFulfilled * this.aTxnValues[i].fx,
                        fx: this.aTxnValues[i].fx,
                        ts: this.aTxnValues[i].ts
                    });
                }

                const fx = txnPairInfo.others.reduce((accumulator, current) => {
                    return accumulator + current.fx * (current.value / value);
                }, 0);
                this.txnBalances.push({
                    value,
                    from: txnPairInfo.fx,
                    to: fx
                });
            }
        }
    }

    private buildLeftBValues() {
        for (let i = this.bValues.length - 1; i >= 0; i--) {
            const bValue = this.bValues[i];
            if (bValue > 0) {
                this.bLeftValues.push({
                    ts: this.bTxnValues[i].ts,
                    value: bValue,
                    fx: this.bTxnValues[i].fx
                });
            }
        }
    }
}