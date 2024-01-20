import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";

export type CurrPairBalance = {
    values: TxnValue[];
};


export const CurrPairBalanceUtils = {
    getDummy(): CurrPairBalance {
        return {
            values: []
        };
    }
};