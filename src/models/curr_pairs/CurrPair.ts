import type { Curr } from "../Curr";

export enum CurrPair {
    PLN_EUR = "PLN_EUR", PLN_USD = "PLN_USD", USD_EUR = "USD_EUR"
}


export const CurrPairUtils = {
    fromCurrs(a: Curr, b: Curr): CurrPair | undefined {
        if(a === b)
            return;

        const providedCurrPair = `${a}_${b}` as CurrPair;
        if(Object.values(CurrPair).some(currPair => currPair === providedCurrPair))
            return providedCurrPair;
    },
    toList(currPair: CurrPair) {
        return currPair.split("_");
    }
};