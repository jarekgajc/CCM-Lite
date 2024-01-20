import type {CurrPairBalance} from "@/models/curr_pairs/CurrPairBalance";
import {SaveWriter} from "@/utils/saves/SaveWriter";
import {SaveReader} from "@/utils/saves/SaveReader";
import { FileUtils } from "@/utils/FileUtils";
import { DateUtils } from "@/utils/DateUtils";

export type Save = {
    balanceMap: {[key: string]: CurrPairBalance};
};

export const SaveUtils = {
    read(): Save | undefined {
        const data = localStorage.getItem("ccm-save");
        if(data == null)
            return undefined;
        return new SaveReader(data).read();
    },
    write(save: Save) {
        const data = new SaveWriter(save).write();
        FileUtils.download(data, `ccm-save-${DateUtils.format(new Date())}.json`);
        localStorage.setItem("ccm-save", data);
    }
};