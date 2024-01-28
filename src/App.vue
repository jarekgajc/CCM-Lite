<script setup lang="ts">
import CurrPairBalanceImporterView from "@/components/CurrPairBalanceImporterView.vue";
import CurrPairBalanceView from "@/components/CurrPairBalanceView.vue";
import { SaveUtils, type Save } from "@/models/Save";
import { CurrPair } from "@/models/curr_pairs/CurrPair";
import { CurrPairBalanceUtils } from "@/models/curr_pairs/CurrPairBalance";
import { CurrPairBalanceMerger } from "@/utils/CurrPairBalanceMerger";
import { onMounted, ref, toRaw, type Ref } from "vue";
import SaveImporterView from "./components/SaveImporterView.vue";
import type { TxnValue } from "./models/curr_pairs/txns/TxnValue";

const save: Ref<Save> = ref<Save>({
  balanceMap: {
    [CurrPair.PLN_EUR]: CurrPairBalanceUtils.getDummy(),
    [CurrPair.PLN_USD]: CurrPairBalanceUtils.getDummy(),
    [CurrPair.USD_EUR]: CurrPairBalanceUtils.getDummy(),
  }
});

onMounted(() => {
  const lastSave = SaveUtils.read();
  if(lastSave) {
    save.value = lastSave;
  }
});

function appendTxnValues(map: Map<CurrPair, TxnValue[]>) {
  let rawSave = toRaw(save);
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
  
  console.log([...map.entries()]);
  
  [...map.entries()].forEach(([currPair, values]) => {
    console.log(currPair);
    console.log(values);
    console.log("_________________________________________________________________");
    
    save.value.balanceMap[currPair] = new CurrPairBalanceMerger(rawSave.value.balanceMap[currPair], {
      values: values
    }).merge();
  })
  // SaveUtils.write(rawSave.value);
}

function replaceSave(newSave: Save) {
  save.value = newSave;
}

</script>


<template>
  <b-card-group deck>
    <CurrPairBalanceView :balance="save.balanceMap[CurrPair.PLN_EUR]" :curr-pair="CurrPair.PLN_EUR"/>
    <CurrPairBalanceView :balance="save.balanceMap[CurrPair.PLN_USD]" :curr-pair="CurrPair.PLN_USD"/>
    <CurrPairBalanceView :balance="save.balanceMap[CurrPair.USD_EUR]" :curr-pair="CurrPair.USD_EUR"/>
  </b-card-group>

  <b-card-group deck>
    <SaveImporterView :on-confirm="replaceSave"/>
    <CurrPairBalanceImporterView :on-confirm="appendTxnValues"/>
  </b-card-group>
</template>