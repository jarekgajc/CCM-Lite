<script setup lang="ts">

import { CsvFormat } from "@/models/csv_formats/CsvFormat";
import type { CurrPair } from "@/models/curr_pairs/CurrPair";
import type { TxnValue } from "@/models/curr_pairs/txns/TxnValue";
import { ExchangeTxnValuesConverter } from "@/utils/ExchangeTxnValuesConverter";
import { FileUtils } from "@/utils/FileUtils";
import { CsvReader } from "@/utils/csvs/CsvReader";

const CSV_FORMAT_OPTIONS: {value: CsvFormat, text: CsvFormat}[] = [
  {value: CsvFormat.BUILT_IN, text: CsvFormat.BUILT_IN},
  {value: CsvFormat.REVOLUT, text: CsvFormat.REVOLUT},
];

const props = defineProps<{
  onConfirm: (map: Map<CurrPair, TxnValue[]>) => void;
}>();

let csvFormat: CsvFormat = CsvFormat.BUILT_IN;
let file: File | undefined;

function pickFile(event: Event) {
  file = (event.target as HTMLInputElement).files![0];
}

async function confirm() {
  const text = await FileUtils.toText(file);
  const allValues = new CsvReader(csvFormat, text).read();
  props.onConfirm(new ExchangeTxnValuesConverter(allValues).toMap());
}

</script>

<template>
  <b-form-select v-model="csvFormat" :options="CSV_FORMAT_OPTIONS"/>
  <input type="file" @change="pickFile">
  <b-button @click="confirm" variant="primary">Import</b-button>
</template>