import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import type { CsvFormatReader } from "@/utils/csvs/formats/CsvFormatReader";
import { AutoDetectCsvFormatUtils } from "./AutoDetectCsvFormatUtils";

const COLUMNS = {
    Curr: "Curr",
    Value: "Value",
    Date: "Date"
};

export class BuiltInCsvFormatReader implements CsvFormatReader {
    isValid(row: any): boolean {
        return parseFloat(row[COLUMNS.Value]) !== 0;
    }

    read(row: any): ExchangeTxnValue {
        return {
            curr: row[COLUMNS.Curr],
            to: undefined,
            from: parseFloat(row[COLUMNS.Value]),
            ts: new Date(row[COLUMNS.Date])
        };
    }

    static isRightFormat(row: any) {
        return AutoDetectCsvFormatUtils.containsAllColumns(row, Object.values(COLUMNS));
    }
}