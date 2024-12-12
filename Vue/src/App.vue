<script setup lang="ts">
import type { ContentType } from '@/components/ContentWindow/types';
import { ref, nextTick } from 'vue';
import TerminalHeader from '@/components/Header.vue';
import TerminalFooter from '@/components/Footer.vue';
import ContentWindow from '@/components/ContentWindow/ContentWindow.vue';
import ActionsList from '@/components/ActionsList/ActionsList.vue';
import { EContentType } from './constants';


const isLaunched = ref<boolean>(false);
const isContentUpdated = ref<boolean>(false);
const isReasonsFinished = ref<boolean>(false);
const isActionsProhibited = ref<boolean>(false);
const isTimerActive = ref<boolean>(false);
const contentType = ref<ContentType | ''>('');


function handleInit() {
  isLaunched.value = true;
  contentType.value = EContentType.INIT;
}

function handleTimer() {
  isTimerActive.value = !isTimerActive.value;
}

function handleVacationStart() {
  isActionsProhibited.value = true;
  contentType.value = EContentType.VACATION;
}

function handleVacationFinish() {
  isActionsProhibited.value = false;
}

function handleReasons() {
  contentType.value = EContentType.REASONS;
}

function handleExit() {
  isActionsProhibited.value = true;
  contentType.value = EContentType.EXIT;
}

function handleReasonsShow() {
  isReasonsFinished.value = true;
}

function handleSessionFinish() {
  contentType.value = '';
  isLaunched.value = false;
  isActionsProhibited.value = false;
}

async function processAction(
  eventHandler: () => void,
  isProcessingTimer = false,
) {
  if (!isProcessingTimer) {
    isReasonsFinished.value = false;
    isContentUpdated.value = true;
  }
  eventHandler();
  await nextTick();
  isContentUpdated.value = false;
}

</script>

<template>
  <TerminalHeader/>
  <ContentWindow
    :content-type="contentType"
    :is-content-updated="isContentUpdated"
    :is-timer-active="isTimerActive"
    @vacation-displayed="handleVacationFinish"
    @all-reasons-showed="handleReasonsShow"
    @session-finish="handleSessionFinish"
  />
  <ActionsList
    :is-launched="isLaunched"
    :is-timer-active="isTimerActive"
    :is-actions-prohibited="isActionsProhibited"
    :is-reasons-finished="isReasonsFinished"
    @init="processAction(handleInit)"
    @time="processAction(handleTimer, true)"
    @vacation="processAction(handleVacationStart)"
    @reasons="processAction(handleReasons)"
    @exit="processAction(handleExit)"
  />
  <TerminalFooter/>
</template>


<style>
:root {
  /* Цвета */
  --white: #FFFFFF;
  --greenL: #8ABEB7;
  --greenM: #3fc53f;
  --greenD: #5E8D87;
  --red: #FF0000;
  --orange: #DE935F;
  --black: #373B41;
  --grey: #707880; 
  /* Шрифт */
  --titleFontSize: 64px;
  --textFontSize: 32px;
}

#app {
  width: 100vw;
  height: 100vh;
  background-color: var(--black);

  display: grid;
  grid-template-areas: "header header" "window commands" "footer footer";
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr 10fr 1fr;
  gap: 16px;

  & > * {
    border: 8px dashed var(--greenD);
  }
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  margin: 0;
}

h2 {
  margin: 0 0 24px;
}
</style>
