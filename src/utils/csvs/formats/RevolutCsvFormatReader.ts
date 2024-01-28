import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import type { CsvFormatReader } from "@/utils/csvs/formats/CsvFormatReader";

const COLUMNS = {
    Type: "Type",
    Product: "Product",
    StartedDate: "Started Date",
    CompletedDate: "Completed Date",
    Description: "Description",
    Amount: "Amount",
    Fee: "Fee",
    Currency: "Currency",
    State: "State",
    Balance: "Balance",
};

export class RevolutCsvFormatReader implements CsvFormatReader {
    isValid(row: any): boolean {
        return row[COLUMNS.Type] === "EXCHANGE" && row[COLUMNS.State] === "COMPLETED";
    }

    read(row: any): ExchangeTxnValue {
        return {
            curr: row[COLUMNS.Currency],
            to: undefined,
            from: parseFloat(row[COLUMNS.Amount]),
            ts: new Date(row[COLUMNS.CompletedDate])
        };
    }
}