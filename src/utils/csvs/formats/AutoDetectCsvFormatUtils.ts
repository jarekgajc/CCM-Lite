
export const AutoDetectCsvFormatUtils = {
    containsAllColumns(row: any, columns: string[]) {
        return Object.keys(row).every(key => columns.includes(key));
    }
};