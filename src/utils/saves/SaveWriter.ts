import type {Save} from "@/models/Save";

export class SaveWriter {
    constructor(private readonly save: Save) {
    }

    write(): string {
        return JSON.stringify(this.save);
    }
}