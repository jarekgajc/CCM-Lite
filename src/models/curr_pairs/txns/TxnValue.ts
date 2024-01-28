
export type TxnValue = {
    to: number | undefined;
    from: number;
    ts: Date;
};


export const TxnValueUtils = {
    copy(txnValue: TxnValue): TxnValue {
        return {
            to: txnValue.to,
            from: txnValue.from,
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