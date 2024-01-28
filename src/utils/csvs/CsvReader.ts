import type { CsvFormat } from "@/models/csv_formats/CsvFormat";
import type { ExchangeTxnValue } from "@/models/curr_pairs/txns/ExchangeTxnValue";
import type { CsvFormatReader } from "@/utils/csvs/formats/CsvFormatReader";
import { CsvFormatReaderUtils } from "@/utils/csvs/formats/CsvFormatReader";

export class CsvReader {
    private readonly formatReader: CsvFormatReader;

    constructor(csvFormat: CsvFormat, private readonly csv: string) {
        this.formatReader = CsvFormatReaderUtils.fromFormat(csvFormat);
    }

    read(): ExchangeTxnValue[] {
        const result: ExchangeTxnValue[] = [];
        parseCSV(this.csv, row => {
            if (this.formatReader.isValid(row)) {
                result.push(this.formatReader.read(row));
            }
        });
        return result;
    }
}

function parseCSV(csvData: string, readRow: (row: {}) => void) {
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const rowObject: any = {};

        for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = values[j];
        }
        readRow(rowObject);
    }
}