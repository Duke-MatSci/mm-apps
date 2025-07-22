<template>
  <div class="md-stepper" :class="stepperClasses">
    <div class="md-stepper-header" @click="handleHeaderClick">
      <div class="md-stepper-number" :class="numberClasses">
        <md-icon v-if="isCompleted">check</md-icon>
        <span v-else>{{ stepNumber }}</span>
      </div>
      <div class="md-stepper-title">
        <slot name="title" />
      </div>
      <div class="md-stepper-subtitle">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="md-stepper-content" v-show="isActive">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import MdIcon from '../MdIcon/MdIcon.vue';

interface StepperContext {
  activeStep: number;
  steps: any[];
  setActiveStep: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  registerStep: (step: number, completed?: boolean, disabled?: boolean) => void;
}

export default defineComponent({
  name: 'MdStepper',
  components: {
    MdIcon,
  },
  props: {
    mdStep: {
      type: Number,
      required: true,
    },
    mdTitle: {
      type: String,
      default: '',
    },
    mdSubtitle: {
      type: String,
      default: '',
    },
    mdCompleted: {
      type: Boolean,
      default: false,
    },
    mdDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const stepperContext = inject('stepperContext') as StepperContext;

    const stepNumber = computed(() => props.mdStep);

    const isActive = computed(() => {
      return stepperContext?.activeStep === props.mdStep;
    });

    const isCompleted = computed(() => {
      return props.mdCompleted || stepperContext?.isStepCompleted(props.mdStep);
    });

    const isDisabled = computed(() => {
      return props.mdDisabled;
    });

    // Register this step with the stepper context
    if (stepperContext) {
      stepperContext.registerStep(props.mdStep, props.mdCompleted, props.mdDisabled);
    }

    const stepperClasses = computed(() => {
      return {
        'md-active': isActive.value,
        'md-completed': isCompleted.value,
        'md-disabled': isDisabled.value,
      };
    });

    const numberClasses = computed(() => {
      return {
        'md-completed': isCompleted.value,
        'md-active': isActive.value,
      };
    });

    const handleHeaderClick = () => {
      if (!isDisabled.value && stepperContext) {
        stepperContext.setActiveStep(props.mdStep);
      }
    };

    return {
      stepNumber,
      isActive,
      isCompleted,
      isDisabled,
      stepperClasses,
      numberClasses,
      handleHeaderClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './theme.scss';
</style>
