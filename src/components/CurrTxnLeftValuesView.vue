<script setup lang="ts">
import {onMounted, onUpdated, type Ref, ref} from "vue";
import type {TxnLeftValue} from "@/models/curr_pairs/txns/TxnLeftValue";
import CurrText from "@/components/CurrText.vue";

let amount: Ref<number> = ref(0);

const props = defineProps<{
  curr: string;
  txnLeftValues: TxnLeftValue[];
}>();

onMounted(() => {
  update();
});

onUpdated(() => {
  update();
})

function update() {
  amount.value = props.txnLeftValues.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.value;
  }, 0);
}

</script>

<template>
    <b-card-text v-if="txnLeftValues[0]">Pending: <CurrText :value="txnLeftValues[0].value" :curr="props.curr"/> ({{
        Math.round(txnLeftValues[0].fx * 10000) / 10000
      }})</b-card-text>
  <b-card-text>All pending: <CurrText :value="amount" :curr="props.curr"/></b-card-text>
</template>