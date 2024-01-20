import type {CsvFormatReader} from "@/utils/csvs/formats/CsvFormatReader";
import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";

export class BuiltInCsvFormatReader implements CsvFormatReader {
    isValid(row: any): boolean {
        return true;
    }

    read(row: any): TxnValue {
        return {
            to: undefined,
            value: parseFloat(row["Value"]),
            ts: new Date(row["Date"])
        };
    }
}