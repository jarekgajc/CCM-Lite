import type {Save} from "@/models/Save";

export class SaveReader {
    constructor(private readonly data: string) {
    }

    read(): Save {
        return JSON.parse(this.data);
    }
}