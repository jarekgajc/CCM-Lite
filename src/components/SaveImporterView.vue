<script setup lang="ts">

import type { Save } from "@/models/Save";
import { FileUtils } from "@/utils/FileUtils";
import { SaveReader } from "@/utils/saves/SaveReader";

const props = defineProps<{
  onConfirm: (save: Save) => void;
}>();

let file: File | undefined;

function pickFile(event: Event) {
  file = (event.target as HTMLInputElement).files![0];
}

async function confirm() {
  props.onConfirm(new SaveReader(await FileUtils.toText(file)).read());
}

</script>

<template>
  <input type="file" @change="pickFile">
  <b-button @click="confirm" variant="primary">Import</b-button>
</template>