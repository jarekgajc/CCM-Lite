<script setup lang="ts">
import type {CurrPairBalance} from "@/models/curr_pairs/CurrPairBalance";
import {type CurrPair, CurrPairUtils} from "@/models/curr_pairs/CurrPair";
import {onBeforeMount, onMounted, onUpdated, type Ref, ref} from "vue";
import {TxnBalanceBuilder, type TxnBalanceBuilderResponse} from "@/utils/TxnBalanceBuilder";
import CurrTxnLeftValuesView from "@/components/CurrTxnLeftValuesView.vue";
import CurrText from "@/components/CurrText.vue";

let summary: Ref<number> = ref(0);
let currList: string[];
let balance: Ref<TxnBalanceBuilderResponse | undefined> = ref<TxnBalanceBuilderResponse>();

const props = defineProps<{
  currPair: CurrPair;
  balance: CurrPairBalance;
}>();

onBeforeMount(() => {
  currList = CurrPairUtils.toList(props.currPair);
});

onUpdated(() => {
  balance.value = new TxnBalanceBuilder(props.balance.values).build();
  summary.value = balance.value.txnBalances.reduce((accumulator, currentItem) => {
    return accumulator + (currentItem.to - currentItem.from) * currentItem.value;
  }, 0);
});

</script>

<template>
    <b-card
        :header="currPair"
    >
      <CurrTxnLeftValuesView v-if="balance" :txn-left-values="balance.aLeftValues" :curr="currList[0]"/>
      <CurrTxnLeftValuesView v-if="balance" :txn-left-values="balance.bLeftValues" :curr="currList[1]"/>
      <b-card-text>Summary: <CurrText :value="summary" :curr="currList[0]"/></b-card-text>
    </b-card>
</template>