<script setup lang="ts">
import type { ContentType } from './types';
import { useTemplateRef, watch } from 'vue';
import { EContentType } from '@/constants';
import { 
  ProgressBar,
  Container,
  Reasons,
  Vacation,
  Timer
} from './elements';


enum EEvents {
  VACATION_DISPLAYED = 'vacationDisplayed',
  ALL_REASONS_SHOWED = 'allReasonsShowed',
  SESSION_FINISH = 'sessionFinish',
}

type Props = {
  isTimerActive: boolean;
  isContentUpdated: boolean;
  contentType: ContentType | '',
};
type Emits = {
  (e: EEvents.VACATION_DISPLAYED): void,
  (e: EEvents.ALL_REASONS_SHOWED): void;
  (e: EEvents.SESSION_FINISH): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const reasonsListRef = useTemplateRef<InstanceType<typeof Reasons>>('reasonsList');

watch(() => props.isContentUpdated, (newVal) => {
  if (!newVal || props.contentType !== EContentType.REASONS || !reasonsListRef.value) return;
  const isShowedAllReasons = (reasonsListRef.value as InstanceType<typeof Reasons>).addListItem();
  if (!isShowedAllReasons) return;
  emit(EEvents.ALL_REASONS_SHOWED);
});
watch(() => props.contentType, (newVal) => {
  if (newVal === EContentType.REASONS) return;
});
</script>

<template>
  <main class="centered">
    <div class="content centered">
      <Container
        v-if="props.contentType"
        :content-type="props.contentType"
      >
        <Vacation
          v-if="contentType === EContentType.VACATION"
          @finish="emit(EEvents.VACATION_DISPLAYED)"
        />
        <Reasons
          v-if="contentType === EContentType.REASONS"
          ref="reasonsList"
        />
        <ProgressBar
          v-if="contentType === EContentType.EXIT"
          @finish="emit(EEvents.SESSION_FINISH)"
        />
      </Container>
    </div>
    <Timer v-if="props.isTimerActive"/>
  </main>
</template>

<style>
p {
  font-size: var(--textFontSize);
  color: var(--white);
}
</style>

<style scoped>
main {
  grid-area: window;
  display: flex;
  flex-direction: column;
  border-left: none !important;
  position: relative;
}

.content {
  width: 80%;
  height: 80%;
  background: var(--grey);
  flex-direction: column;
}
</style>