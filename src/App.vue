<script setup lang="ts">
import {type CurrPairBalance, CurrPairBalanceUtils} from "@/models/curr_pairs/CurrPairBalance";
import CurrPairBalanceView from "@/components/CurrPairBalanceView.vue";
import {CurrPair} from "@/models/curr_pairs/CurrPair";
import {onMounted, type Ref, ref, toRaw} from "vue";
import CurrPairBalanceImporterView from "@/components/CurrPairBalanceImporterView.vue";
import {CurrPairBalanceMerger} from "@/utils/CurrPairBalanceMerger";
import {type Save, SaveUtils} from "@/models/Save";
import SaveImporterView from "./components/SaveImporterView.vue";

const save: Ref<Save> = ref<Save>({
  balanceMap: {
    [CurrPair.PLN_EUR]: CurrPairBalanceUtils.getDummy(),
    [CurrPair.PLN_USD]: CurrPairBalanceUtils.getDummy(),
    [CurrPair.EUR_USD]: CurrPairBalanceUtils.getDummy(),
  }
});

onMounted(() => {
  const lastSave = SaveUtils.read();
  if(lastSave) {
    save.value = lastSave;
  }
});

function appendBalance(currPair: CurrPair, balance: CurrPairBalance) {
  let rawSave = toRaw(save);
  save.value.balanceMap[currPair] = new CurrPairBalanceMerger(rawSave.value.balanceMap[currPair], balance).merge();
  SaveUtils.write(rawSave.value);
}

function replaceSave(newSave: Save) {
  save.value = newSave;
}

</script>


<template>
  <b-card-group deck>
    <CurrPairBalanceView :balance="save.balanceMap[CurrPair.PLN_EUR]" :curr-pair="CurrPair.PLN_EUR"/>
    <CurrPairBalanceView :balance="save.balanceMap[CurrPair.PLN_USD]" :curr-pair="CurrPair.PLN_USD"/>
    <CurrPairBalanceView :balance="save.balanceMap[CurrPair.EUR_USD]" :curr-pair="CurrPair.EUR_USD"/>
  </b-card-group>

  <SaveImporterView :on-confirm="replaceSave"/>
  <CurrPairBalanceImporterView :on-confirm="appendBalance"/>
</template>