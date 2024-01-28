import { CsvFormat } from "@/models/csv_formats/CsvFormat";
import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import { BuiltInCsvFormatReader } from "@/utils/csvs/formats/BuiltInCsvFormatReader";
import { RevolutCsvFormatReader } from "@/utils/csvs/formats/RevolutCsvFormatReader";
import { AutoDetectCsvFormatReader } from "./AutoDetectCsvFormatReader";

export interface CsvFormatReader {
    isValid(row: any): boolean;
    read(row: any): ExchangeTxnValue;
}


export const CsvFormatReaderUtils = {
    fromFormat(csvFormat: CsvFormat): CsvFormatReader {
        switch (csvFormat) {
            case CsvFormat.AUTO_DETECT:
                return new AutoDetectCsvFormatReader();
            case CsvFormat.BUILT_IN:
                return new BuiltInCsvFormatReader();
            case CsvFormat.REVOLUT:
                return new RevolutCsvFormatReader();
            default:
                throw new Error("NotImplemented");
        }
    }
};