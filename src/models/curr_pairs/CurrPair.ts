
export enum CurrPair {
    PLN_EUR = "PLN_EUR", PLN_USD = "PLN_USD", EUR_USD = "EUR_USD"
}


export const CurrPairUtils = {
    toList(currPair: CurrPair) {
        return currPair.split("_");
    }
};