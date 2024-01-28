
export type TxnValue = {
    to: number | undefined;
    value: number;
    ts: Date;
};


export const TxnValueUtils = {
    copy(txnValue: TxnValue) {
        return {
            to: txnValue.to,
            value: txnValue.value,
            ts: txnValue.ts
        };
    },
    isOpen(txnValue: TxnValue) {
        return txnValue.to === undefined;
    },
    equals(a: TxnValue, b: TxnValue) {
        return a.ts.getTime() === b.ts.getTime();
    }
};