<template>
  <div class="md-steppers-test">
    <h1>MdSteppers Test</h1>

    <div class="test-section">
      <h2>Basic Stepper</h2>
      <md-steppers v-model:md-active-step="activeStep" @md-step-change="handleStepChange">
        <md-stepper :md-step="1" :md-completed="step1Completed">
          <template #title>Step 1</template>
          <template #subtitle>Basic Information</template>
          <div class="step-content">
            <p>This is the first step content.</p>
            <md-button @click="completeStep1" class="md-raised md-primary">
              Complete Step 1
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="2" :md-completed="step2Completed">
          <template #title>Step 2</template>
          <template #subtitle>Additional Details</template>
          <div class="step-content">
            <p>This is the second step content.</p>
            <md-button @click="completeStep2" class="md-raised md-primary">
              Complete Step 2
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="3">
          <template #title>Step 3</template>
          <template #subtitle>Final Step</template>
          <div class="step-content">
            <p>This is the final step content.</p>
            <md-button @click="finishSteps" class="md-raised md-primary"> Finish </md-button>
          </div>
        </md-stepper>

        <md-steppers-navigation
          @md-step-change="handleStepChange"
          @md-step-finish="handleStepFinish"
        />
      </md-steppers>
    </div>

    <div class="test-section">
      <h2>Linear Stepper</h2>
      <md-steppers
        v-model:md-active-step="linearActiveStep"
        md-linear
        @md-step-change="handleLinearStepChange"
      >
        <md-stepper :md-step="1" :md-completed="linearStep1Completed">
          <template #title>Linear Step 1</template>
          <template #subtitle>Must complete to continue</template>
          <div class="step-content">
            <p>This step must be completed before moving to the next.</p>
            <md-button @click="completeLinearStep1" class="md-raised md-primary">
              Complete Step 1
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="2" :md-completed="linearStep2Completed">
          <template #title>Linear Step 2</template>
          <template #subtitle>Second required step</template>
          <div class="step-content">
            <p>This is the second linear step.</p>
            <md-button @click="completeLinearStep2" class="md-raised md-primary">
              Complete Step 2
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="3">
          <template #title>Linear Step 3</template>
          <template #subtitle>Final linear step</template>
          <div class="step-content">
            <p>This is the final linear step.</p>
          </div>
        </md-stepper>

        <md-steppers-navigation
          @md-step-change="handleLinearStepChange"
          @md-step-finish="handleLinearStepFinish"
        />
      </md-steppers>
    </div>

    <div class="test-section">
      <h2>Vertical Stepper</h2>
      <md-steppers
        v-model:md-active-step="verticalActiveStep"
        md-vertical
        @md-step-change="handleVerticalStepChange"
      >
        <md-stepper :md-step="1" :md-completed="verticalStep1Completed">
          <template #title>Vertical Step 1</template>
          <template #subtitle>Top step</template>
          <div class="step-content">
            <p>This is a vertical stepper layout.</p>
            <md-button @click="completeVerticalStep1" class="md-raised md-primary">
              Complete Step 1
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="2" :md-completed="verticalStep2Completed">
          <template #title>Vertical Step 2</template>
          <template #subtitle>Middle step</template>
          <div class="step-content">
            <p>Content appears to the right of the step header.</p>
            <md-button @click="completeVerticalStep2" class="md-raised md-primary">
              Complete Step 2
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="3">
          <template #title>Vertical Step 3</template>
          <template #subtitle>Bottom step</template>
          <div class="step-content">
            <p>This is the final vertical step.</p>
          </div>
        </md-stepper>

        <md-steppers-navigation
          @md-step-change="handleVerticalStepChange"
          @md-step-finish="handleVerticalStepFinish"
        />
      </md-steppers>
    </div>

    <div class="test-section">
      <h2>Alternative Stepper</h2>
      <md-steppers
        v-model:md-active-step="alternativeActiveStep"
        md-alternative
        @md-step-change="handleAlternativeStepChange"
      >
        <md-stepper :md-step="1" :md-completed="alternativeStep1Completed">
          <template #title>Alternative Step 1</template>
          <template #subtitle>Centered layout</template>
          <div class="step-content">
            <p>This stepper has an alternative centered layout.</p>
            <md-button @click="completeAlternativeStep1" class="md-raised md-primary">
              Complete Step 1
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="2" :md-completed="alternativeStep2Completed">
          <template #title>Alternative Step 2</template>
          <template #subtitle>Centered content</template>
          <div class="step-content">
            <p>Step headers are centered in this layout.</p>
            <md-button @click="completeAlternativeStep2" class="md-raised md-primary">
              Complete Step 2
            </md-button>
          </div>
        </md-stepper>

        <md-stepper :md-step="3">
          <template #title>Alternative Step 3</template>
          <template #subtitle>Final alternative step</template>
          <div class="step-content">
            <p>This is the final alternative step.</p>
          </div>
        </md-stepper>

        <md-steppers-navigation
          @md-step-change="handleAlternativeStepChange"
          @md-step-finish="handleAlternativeStepFinish"
        />
      </md-steppers>
    </div>

    <div class="test-section">
      <h2>Current Status</h2>
      <div class="status-info">
        <p><strong>Basic Stepper:</strong> Step {{ activeStep }} of 3</p>
        <p><strong>Linear Stepper:</strong> Step {{ linearActiveStep }} of 3</p>
        <p><strong>Vertical Stepper:</strong> Step {{ verticalActiveStep }} of 3</p>
        <p><strong>Alternative Stepper:</strong> Step {{ alternativeActiveStep }} of 3</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MdSteppersTest',
  setup() {
    // Basic stepper state
    const activeStep = ref(1);
    const step1Completed = ref(false);
    const step2Completed = ref(false);

    // Linear stepper state
    const linearActiveStep = ref(1);
    const linearStep1Completed = ref(false);
    const linearStep2Completed = ref(false);

    // Vertical stepper state
    const verticalActiveStep = ref(1);
    const verticalStep1Completed = ref(false);
    const verticalStep2Completed = ref(false);

    // Alternative stepper state
    const alternativeActiveStep = ref(1);
    const alternativeStep1Completed = ref(false);
    const alternativeStep2Completed = ref(false);

    // Basic stepper methods
    const handleStepChange = (step: number) => {
      console.log('Basic stepper changed to step:', step);
    };

    const completeStep1 = () => {
      step1Completed.value = true;
    };

    const completeStep2 = () => {
      step2Completed.value = true;
    };

    const handleStepFinish = () => {
      console.log('Basic stepper finished!');
    };

    // Linear stepper methods
    const handleLinearStepChange = (step: number) => {
      console.log('Linear stepper changed to step:', step);
    };

    const completeLinearStep1 = () => {
      linearStep1Completed.value = true;
    };

    const completeLinearStep2 = () => {
      linearStep2Completed.value = true;
    };

    const handleLinearStepFinish = () => {
      console.log('Linear stepper finished!');
    };

    // Vertical stepper methods
    const handleVerticalStepChange = (step: number) => {
      console.log('Vertical stepper changed to step:', step);
    };

    const completeVerticalStep1 = () => {
      verticalStep1Completed.value = true;
    };

    const completeVerticalStep2 = () => {
      verticalStep2Completed.value = true;
    };

    const handleVerticalStepFinish = () => {
      console.log('Vertical stepper finished!');
    };

    // Alternative stepper methods
    const handleAlternativeStepChange = (step: number) => {
      console.log('Alternative stepper changed to step:', step);
    };

    const completeAlternativeStep1 = () => {
      alternativeStep1Completed.value = true;
    };

    const completeAlternativeStep2 = () => {
      alternativeStep2Completed.value = true;
    };

    const handleAlternativeStepFinish = () => {
      console.log('Alternative stepper finished!');
    };

    const finishSteps = () => {
      console.log('Steps finished!');
    };

    return {
      // Basic stepper
      activeStep,
      step1Completed,
      step2Completed,
      handleStepChange,
      completeStep1,
      completeStep2,
      handleStepFinish,

      // Linear stepper
      linearActiveStep,
      linearStep1Completed,
      linearStep2Completed,
      handleLinearStepChange,
      completeLinearStep1,
      completeLinearStep2,
      handleLinearStepFinish,

      // Vertical stepper
      verticalActiveStep,
      verticalStep1Completed,
      verticalStep2Completed,
      handleVerticalStepChange,
      completeVerticalStep1,
      completeVerticalStep2,
      handleVerticalStepFinish,

      // Alternative stepper
      alternativeActiveStep,
      alternativeStep1Completed,
      alternativeStep2Completed,
      handleAlternativeStepChange,
      completeAlternativeStep1,
      completeAlternativeStep2,
      handleAlternativeStepFinish,

      // General
      finishSteps,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-steppers-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  .test-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;

    h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
    }
  }

  .step-content {
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-top: 16px;

    p {
      margin-bottom: 16px;
    }
  }

  .status-info {
    background-color: #e3f2fd;
    padding: 16px;
    border-radius: 4px;
    border-left: 4px solid #2196f3;

    p {
      margin: 8px 0;
    }
  }
}
</style>
