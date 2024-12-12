<script setup lang="ts">
import { ref } from 'vue';
import { REASONS_LIST } from '../constants';


const reasons = ref<string[]>([]);

let listItemsGen: Generator<undefined, void, unknown> | null = null;

function* initListItemsGenerator() {
  for (let i = 0; i < REASONS_LIST.length; i++) {
    reasons.value.push(REASONS_LIST[i]);
    if (i !== REASONS_LIST.length - 1) yield;
  }
  listItemsGen = null;
}

function addListItem(): boolean {
  if (!listItemsGen) {
    listItemsGen = initListItemsGenerator();
  }
  return !!listItemsGen.next().done;
}

defineExpose({ addListItem })
</script>

<template>
  <ol>
    <li
      v-for="reason of reasons"
      :key="reason"
    >
      {{  reason }}
    </li>
  </ol>
</template>

<style scoped>
ol {
  width: fit-content;
  min-width: 25%;
  margin: 0;
}

li {
  color: var(--white);
  font-size: var(--textFontSize);
  &:not(&:last-child) {
    margin-bottom: 8px;
  }
}
</style>