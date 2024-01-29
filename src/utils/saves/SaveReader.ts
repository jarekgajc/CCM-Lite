import type {Save} from "@/models/Save";

export class SaveReader {
    constructor(private readonly data: string) {
    }

    read(): Save {
        //TODO: store save in a different format
        const save: Save = JSON.parse(this.data);
        Object.keys(save.balanceMap).forEach(key => {
            save.balanceMap[key].values.forEach(value => {
                value.ts = new Date(value.ts);
            });
        });
        return save;
    }
}