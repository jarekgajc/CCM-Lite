import {CsvFormat} from "@/models/csv_formats/CsvFormat";
import {RevolutCsvFormatReader} from "@/utils/csvs/formats/RevolutCsvFormatReader";
import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";
import {BuiltInCsvFormatReader} from "@/utils/csvs/formats/BuiltInCsvFormatReader";

export interface CsvFormatReader {
    isValid(row: object): boolean;
    read(row: object): TxnValue;
}


export const CsvFormatReaderUtils = {
    fromFormat(csvFormat: CsvFormat): CsvFormatReader {
        switch (csvFormat) {
            case CsvFormat.BUILT_IN:
                return new BuiltInCsvFormatReader();
            case CsvFormat.REVOLUT:
                return new RevolutCsvFormatReader();
            default:
                throw new Error("NotImplemented");
        }
    }
};