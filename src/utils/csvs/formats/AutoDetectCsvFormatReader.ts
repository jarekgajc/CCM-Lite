import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import type { CsvFormatReader } from "@/utils/csvs/formats/CsvFormatReader";
import { BuiltInCsvFormatReader } from "./BuiltInCsvFormatReader";
import { RevolutCsvFormatReader } from "./RevolutCsvFormatReader";

export class AutoDetectCsvFormatReader implements CsvFormatReader {
    private formatReader: CsvFormatReader | undefined;


    isValid(row: any): boolean {
        return this.getFormatReader(row).isValid(row);
    }

    read(row: any): ExchangeTxnValue {
        return this.getFormatReader(row).read(row);
    }

    private getFormatReader(row: any) {
        if(this.formatReader)
            return this.formatReader;
        
        if(RevolutCsvFormatReader.isRightFormat(row)) {
            return this.formatReader = new RevolutCsvFormatReader();
        } else if(BuiltInCsvFormatReader.isRightFormat(row)) {
            return this.formatReader = new BuiltInCsvFormatReader();
        }
        throw new Error("Csv format couldn't be detected");
    }
}