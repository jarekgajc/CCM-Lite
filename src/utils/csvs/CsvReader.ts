import type {CsvFormat} from "@/models/csv_formats/CsvFormat";
import type {CsvFormatReader} from "@/utils/csvs/formats/CsvFormatReader";
import {CsvFormatReaderUtils} from "@/utils/csvs/formats/CsvFormatReader";
import type {TxnValue} from "@/models/curr_pairs/txns/TxnValue";

export class CsvReader {
    private readonly formatReader: CsvFormatReader;

    constructor(csvFormat: CsvFormat, private readonly csv: string) {
        this.formatReader = CsvFormatReaderUtils.fromFormat(csvFormat);
    }

    read(): TxnValue[] {
        const result: TxnValue[] = [];
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
    const headers = rows[0].split('\t');

    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split('\t');
        const rowObject: any = {};

        for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = values[j];
        }
        readRow(rowObject);
    }
}