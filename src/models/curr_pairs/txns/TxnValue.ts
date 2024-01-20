
export type TxnValue = {
    to: number | undefined;
    value: number;
    ts: Date;
};


export const TxnValueUtils = {
    isOpen(txnValue: TxnValue) {
        return txnValue.to === undefined;
    },
    equals(a: TxnValue, b: TxnValue) {
        return a.ts.getTime() === b.ts.getTime();
    }
};