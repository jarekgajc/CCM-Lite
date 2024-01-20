import type {CsvFormatReader} from "@/utils/csvs/formats/CsvFormatReader";
import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";

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
        return row[COLUMNS.Type] === "EXCHANGE";
    }

    read(row: any): TxnValue {
        return {
            to: undefined,
            value: parseFloat(row[COLUMNS.Amount]),
            ts: new Date(row[COLUMNS.CompletedDate])
        };
    }
}