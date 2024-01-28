import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import type { CsvFormatReader } from "@/utils/csvs/formats/CsvFormatReader";

export class BuiltInCsvFormatReader implements CsvFormatReader {
    isValid(row: any): boolean {
        return parseFloat(row["Value"]) !== 0;
    }

    read(row: any): ExchangeTxnValue {
        return {
            curr: row["Curr"],
            to: undefined,
            value: parseFloat(row["Value"]),
            ts: new Date(row["Date"])
        };
    }
}