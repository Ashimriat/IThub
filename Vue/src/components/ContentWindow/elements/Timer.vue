<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';


let timerIntervalId!: ReturnType<typeof setInterval>;

const time = ref<string>('');

const getModifiedNumber = (src: number): string => src < 10 ? `0${src}` : `${src}`;

function updateTime() {
  const date = new Date();
  const h = getModifiedNumber(date.getHours());
  const m = getModifiedNumber(date.getMinutes());
  const s = getModifiedNumber(date.getSeconds());
  time.value = `${h}:${m}:${s}`;
}

onBeforeMount(() => {
  updateTime();
});
onMounted(() => {
  timerIntervalId = setInterval(updateTime, 1_000);
});
onBeforeUnmount(() => {
  clearInterval(timerIntervalId)
});
</script>

<template>
  <div class="timer">
    Текущее время: {{ time }}
  </div>
</template>

<style scoped>
.timer {
  font-size: 24px;
  position: absolute;
  color: var(--white);
  bottom: 2%;
}
</style>