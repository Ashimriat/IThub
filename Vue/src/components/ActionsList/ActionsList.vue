<script setup lang="ts">
import { computed } from 'vue';
import { EContentType as EEvents } from '@/constants';
import { BUTTONS_ORDER, BUTTONS_TEXTS_DATA } from './constants';


type DisplayedButtonsRecord = Record<EEvents, {
  text: string;
  isDisplayed: boolean;
  isDisabled: boolean;
}>;

type Props = {
  isLaunched: boolean;
  isTimerActive: boolean;
  isReasonsFinished: boolean;
  isActionsProhibited: boolean;
};
type Emits = {
  (e: EEvents): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const displayedButtons = computed<DisplayedButtonsRecord>(() => {
  return BUTTONS_ORDER.reduce((acc, val) => {
    const providedText = BUTTONS_TEXTS_DATA[val];
    let text!: string;
    if (typeof providedText === 'string') {
      text = providedText;
    } else {
      text = props.isTimerActive ? providedText.active : providedText.disabled;
    }
    const isDisplayed = val === EEvents.INIT ? !props.isLaunched : props.isLaunched;
    let isDisabled = val === EEvents.REASONS ? props.isReasonsFinished : false;
    if (props.isActionsProhibited) {
      isDisabled = true;
    }
    acc[val] = { text, isDisplayed, isDisabled };
    return acc;
  }, <DisplayedButtonsRecord>{});
});
</script>

<template>
  <section>
    <h2>Доступные действия</h2>
    <div class="buttonsList centered">
      <button
        v-for="({ text, isDisplayed, isDisabled }, buttonType) of displayedButtons"
        :key="buttonType"
        :data-test="`action_${buttonType}`"
        v-show="isDisplayed"
        @click.stop="emit(buttonType)"
        :disabled="isDisabled"
      >
        {{ text }}
      </button>
    </div>
  </section>
</template>

<style scoped>
section {
  grid-area: commands;
  padding: 16px;
  border-right: none !important;
  h2 {
    color: var(--white);
    text-align: center;
  }
}

.buttonsList {
  width: 100%;
  flex-direction: column;
  gap: 8px;
}

button {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
}
</style>
