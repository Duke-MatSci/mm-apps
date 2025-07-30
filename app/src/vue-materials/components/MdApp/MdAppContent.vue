<template>
  <div :class="contentClasses" :style="contentStyles">
    <div v-if="showCard" class="md-card">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

// Props
interface Props {
  mdTheme?: string | boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdTheme: undefined,
});

// Inject MdApp context
const MdApp = inject('MdApp') as any;

// Computed properties
const contentClasses = computed(() => {
  return {
    'md-app-content': true,
    [`md-theme-${props.mdTheme}`]: props.mdTheme,
  };
});

const contentStyles = computed(() => {
  return {};
});

const showCard = computed(() => {
  return MdApp?.value?.options?.mode === 'overlap';
});

// Define component name
defineOptions({
  name: 'MdAppContent',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdLayout/mixins.scss';

.md-app-content {
  padding: 16px;

  @include md-layout-small-and-up {
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  > p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
