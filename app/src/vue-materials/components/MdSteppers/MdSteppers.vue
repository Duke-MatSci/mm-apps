<template>
  <div class="md-steppers" :class="stepperClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref, watch, onMounted } from 'vue';

interface StepperStep {
  step: number;
  completed: boolean;
  disabled: boolean;
}

export default defineComponent({
  name: 'MdSteppers',
  props: {
    mdLinear: {
      type: Boolean,
      default: false,
    },
    mdVertical: {
      type: Boolean,
      default: false,
    },
    mdAlternative: {
      type: Boolean,
      default: false,
    },
    mdActiveStep: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:mdActiveStep', 'md-step-change'],
  setup(props, { emit }) {
    const activeStep = ref(props.mdActiveStep);
    const steps = ref<StepperStep[]>([]);
    const totalSteps = ref(0);

    const stepperClasses = computed(() => {
      return {
        'md-linear': props.mdLinear,
        'md-vertical': props.mdVertical,
        'md-alternative': props.mdAlternative,
      };
    });

    const setActiveStep = (step: number) => {
      activeStep.value = step;
      emit('update:mdActiveStep', step);
      emit('md-step-change', step);
    };

    const isStepCompleted = (step: number) => {
      const stepData = steps.value.find((s) => s.step === step);
      return stepData ? stepData.completed : false;
    };

    const registerStep = (step: number, completed = false, disabled = false) => {
      const existingStep = steps.value.find((s) => s.step === step);
      if (existingStep) {
        existingStep.completed = completed;
        existingStep.disabled = disabled;
      } else {
        steps.value.push({ step, completed, disabled });
        totalSteps.value = Math.max(...steps.value.map((s) => s.step));
      }
    };

    const stepperContext = {
      activeStep: activeStep,
      steps: steps,
      totalSteps: totalSteps,
      setActiveStep,
      isStepCompleted,
      registerStep,
    };

    provide('stepperContext', stepperContext);

    watch(
      () => props.mdActiveStep,
      (newStep) => {
        activeStep.value = newStep;
      }
    );

    onMounted(() => {
      activeStep.value = props.mdActiveStep;
    });

    return {
      stepperClasses,
      activeStep,
      totalSteps,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './theme.scss';
</style>
