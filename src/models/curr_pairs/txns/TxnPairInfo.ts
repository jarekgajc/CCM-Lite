export type TxnPairInfo = {
    value: number;
    fx: number;
    others: {
        value: number;
        fx: number;
    }[];
};