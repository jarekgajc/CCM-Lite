import type { Curr } from "@/models/Curr";
import type { TxnValue } from "./TxnValue";

export type ExchangeTxnValue = TxnValue & {
    curr: Curr;
}