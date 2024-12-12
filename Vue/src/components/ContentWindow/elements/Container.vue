<script setup lang="ts">
import type { ContentType } from '../types';
import { computed } from 'vue';
import { CONTENT_TITLES } from '../constants';


type Props = {  
  contentType: ContentType | '',
};
type Slots = {
  default(): void;
}

const props = defineProps<Props>();

const titleText = computed<string>(() => {
  if (!props.contentType) return '';
  return CONTENT_TITLES[props.contentType]
});

defineSlots<Slots>();

</script>

<template>
  <h2 data-test="contentTitle">
    {{ titleText }}
  </h2>
  <slot/>
</template>

<style>
p {
  font-size: var(--textFontSize);
  color: var(--white);
}
</style>

<style scoped>
h2 {
  font-size: 64px;
  color: var(--orange);
  text-align: center;
}
</style>