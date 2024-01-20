<script setup lang="ts">

import { CsvFormat } from "@/models/csv_formats/CsvFormat";
import { CurrPair } from "@/models/curr_pairs/CurrPair";
import type { CurrPairBalance } from "@/models/curr_pairs/CurrPairBalance";
import { FileUtils } from "@/utils/FileUtils";
import { TxnFxBuilder } from "@/utils/TxnFxBuilder";
import { CsvReader } from "@/utils/csvs/CsvReader";

const CSV_FORMAT_OPTIONS: {value: CsvFormat, text: CsvFormat}[] = [
  {value: CsvFormat.BUILT_IN, text: CsvFormat.BUILT_IN},
  {value: CsvFormat.REVOLUT, text: CsvFormat.REVOLUT},
];

const CURR_PAIR_OPTIONS: {value: CurrPair, text: CurrPair}[] = [
  {value: CurrPair.PLN_EUR, text: CurrPair.PLN_EUR},
  {value: CurrPair.PLN_USD, text: CurrPair.PLN_USD},
  {value: CurrPair.EUR_USD, text: CurrPair.EUR_USD},
];

const props = defineProps<{
  onConfirm: (currPair: CurrPair, balance: CurrPairBalance) => void;
}>();

let csvFormat: CsvFormat = CsvFormat.REVOLUT;
let currPair: CurrPair = CurrPair.PLN_EUR;
let files: File[] = [];

function pickFile(id: number, event: Event) {
  files[id] = (event.target as HTMLInputElement).files![0];
}

async function confirm() {
  const [aText, bText] = await Promise.all([FileUtils.toText(files[0]), FileUtils.toText(files[1])]);
  console.log(aText)
  console.log(bText)
  const a = new CsvReader(csvFormat, aText).read();
  const b = new CsvReader(csvFormat, bText).read();
  console.log(a);
  console.log(b);
  console.log(new TxnFxBuilder(a, b).build());
  props.onConfirm(currPair, {
    values: new TxnFxBuilder(a, b).build()
  });
}

</script>

<template>
  <b-form-select v-model="currPair" :options="CURR_PAIR_OPTIONS"/>
  <b-form-select v-model="csvFormat" :options="CSV_FORMAT_OPTIONS"/>
  <input type="file" @change="e => pickFile(0, e)">
  <input type="file" @change="e => pickFile(1, e)">
  <b-button @click="confirm" variant="primary">Import</b-button>
</template>