<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { ref, computed, onBeforeMount, onMounted } from 'vue';
import { wait } from '@/utils';
import { VACATION_DATA } from '../constants';


enum EEvents {
  FINISH = 'finish',
}

type Emits = {
  (e: EEvents.FINISH): void;
}

const emit = defineEmits<Emits>();

const displayedText = ref<string>('');
const textStatus = ref<'pending' | 'success' | 'fail'>('pending');

const textStyle = computed<CSSProperties>(() => {
  if (textStatus.value === 'pending') return {};
  return {
    '--color': textStatus.value === 'success' ? 'var(--greenM)' : 'var(--red)'
  };
});

async function processOperation() {
  try {
    await wait(15_000, 3, (step) => {
      displayedText.value = VACATION_DATA.steps[step];
    }, false);
    displayedText.value = VACATION_DATA.success;
    textStatus.value = 'success';
  } catch {
    displayedText.value = VACATION_DATA.fail;
    textStatus.value = 'fail';
  } finally {
    emit(EEvents.FINISH);
  }
}

onBeforeMount(() => {
  displayedText.value = VACATION_DATA.initial;
});

onMounted(processOperation);
</script>

<template>
  <p :style="textStyle">
    {{ displayedText }}
  </p>
</template>

<style scoped>
p {
  color: var(--color, var(--white));
}
</style>