<template>
  <div class="md-steppers-navigation">
    <md-button
      v-if="showPreviousButton"
      @click="previousStep"
      :disabled="!canGoPrevious"
      class="md-raised"
    >
      {{ previousText }}
    </md-button>
    <md-button
      v-if="showNextButton"
      @click="nextStep"
      :disabled="!canGoNext"
      class="md-raised md-primary"
    >
      {{ nextText }}
    </md-button>
    <md-button v-if="showFinishButton" @click="finishSteps" class="md-raised md-primary">
      {{ finishText }}
    </md-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import MdButton from '../MdButton/MdButton.vue';

interface StepperContext {
  activeStep: number;
  steps: any[];
  setActiveStep: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  totalSteps: number;
}

export default defineComponent({
  name: 'MdSteppersNavigation',
  components: {
    MdButton,
  },
  props: {
    mdPreviousText: {
      type: String,
      default: 'Previous',
    },
    mdNextText: {
      type: String,
      default: 'Next',
    },
    mdFinishText: {
      type: String,
      default: 'Finish',
    },
    mdShowPrevious: {
      type: Boolean,
      default: true,
    },
    mdShowNext: {
      type: Boolean,
      default: true,
    },
    mdShowFinish: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['md-step-change', 'md-step-finish'],
  setup(props, { emit }) {
    const stepperContext = inject('stepperContext') as StepperContext;

    const currentStep = computed(() => stepperContext?.activeStep || 1);
    const totalSteps = computed(() => stepperContext?.totalSteps || 1);

    const showPreviousButton = computed(() => {
      return props.mdShowPrevious && currentStep.value > 1;
    });

    const showNextButton = computed(() => {
      return props.mdShowNext && currentStep.value < totalSteps.value;
    });

    const showFinishButton = computed(() => {
      return props.mdShowFinish && currentStep.value === totalSteps.value;
    });

    const canGoPrevious = computed(() => {
      return currentStep.value > 1;
    });

    const canGoNext = computed(() => {
      return (
        currentStep.value < totalSteps.value && stepperContext?.isStepCompleted(currentStep.value)
      );
    });

    const previousText = computed(() => props.mdPreviousText);
    const nextText = computed(() => props.mdNextText);
    const finishText = computed(() => props.mdFinishText);

    const previousStep = () => {
      if (canGoPrevious.value && stepperContext) {
        const newStep = currentStep.value - 1;
        stepperContext.setActiveStep(newStep);
        emit('md-step-change', newStep);
      }
    };

    const nextStep = () => {
      if (canGoNext.value && stepperContext) {
        const newStep = currentStep.value + 1;
        stepperContext.setActiveStep(newStep);
        emit('md-step-change', newStep);
      }
    };

    const finishSteps = () => {
      emit('md-step-finish');
    };

    return {
      currentStep,
      totalSteps,
      showPreviousButton,
      showNextButton,
      showFinishButton,
      canGoPrevious,
      canGoNext,
      previousText,
      nextText,
      finishText,
      previousStep,
      nextStep,
      finishSteps,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './theme.scss';
</style>
