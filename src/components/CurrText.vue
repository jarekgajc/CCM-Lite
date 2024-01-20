<script setup lang="ts">
import {onMounted, onUpdated, type Ref, ref} from "vue";
import type {TxnLeftValue} from "@/models/curr_pairs/txns/TxnLeftValue";

let value: Ref<number> = ref(0);

const props = defineProps<{
  value: number;
  curr: string;
}>();

onMounted(() => {
  update();
});

onUpdated(() => {
  update();
})

function update() {
  value.value = Math.round(props.value * 100) / 100;
}

</script>

<template>
    <span>{{value}} {{props.curr}}</span>
</template>