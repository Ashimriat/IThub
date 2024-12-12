<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { wait } from '@/utils';

enum EEvents {
  FINISH = 'finish'
}

type Emits = {
  (e: EEvents.FINISH): void;
};

const emit = defineEmits<Emits>();

const progress = ref<number>(0);

async function processExit() {
  await wait(5_000, 5, (step) => {
    progress.value = 100 * (step + 1) / 5;
  });
  emit(EEvents.FINISH);
}

onMounted(() => processExit());
</script>

<template>
  <div>
    <span :style="{ '--progress': `${progress}%` }"></span>
  </div>
</template>

<style scoped>
div {
  width: 50%;
  height: 20px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--white);
}

span {
  display: block;
  width: var(--progress, 0);
  height: 100%;
  background: var(--greenL);
}
</style>