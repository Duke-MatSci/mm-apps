<template>
  <md-button
    class="md-stepper-header"
    :class="classes"
    :disabled="shouldDisable"
    v-bind="data.props"
    v-on="data.events"
    @click="handleClick"
  >
    <md-icon class="md-stepper-icon" v-if="data.error">warning</md-icon>

    <div class="md-stepper-number" v-else>
      <md-icon class="md-stepper-editable" v-if="data.done && data.editable">edit</md-icon>
      <md-icon class="md-stepper-done" v-else-if="data.done">check</md-icon>
      <template v-else>{{ MdSteppers.getStepperNumber(index) }}</template>
    </div>

    <div class="md-stepper-text">
      <span class="md-stepper-label">{{ data.label }}</span>
      <span class="md-stepper-error" v-if="data.error">{{ data.error }}</span>
      <span class="md-stepper-description" v-else-if="data.description">{{
        data.description
      }}</span>
    </div>
  </md-button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import MdButton from '../MdButton/MdButton.vue';
import MdIcon from '../MdIcon/MdIcon.vue';

interface Props {
  index: string;
}

const props = defineProps<Props>();

// Inject MdSteppers from parent
const MdSteppers = inject<any>('MdSteppers');

const data = computed(() => {
  return MdSteppers?.items[props.index] || {};
});

const shouldDisable = computed(() => {
  if (data.value.done && !data.value.editable) {
    return true;
  }

  return MdSteppers?.isLinear && !MdSteppers?.isPreviousStepperDone(props.index);
});

const classes = computed(() => {
  return {
    'md-active': !MdSteppers?.syncRoute && props.index === MdSteppers?.activeStep,
    'md-error': data.value.error,
    'md-done': data.value.done,
  };
});

const handleClick = () => {
  if (!MdSteppers?.syncRoute && MdSteppers) {
    MdSteppers.setActiveStep(props.index);
  }
};

defineOptions({
  name: 'MdStepHeader',
  components: {
    MdButton,
    MdIcon,
  },
});
</script>
