<template>
  <router-link class="md-list-item-router" v-bind="routerProps">
    <md-list-item-content :md-disabled="isDisabled">
      <slot />
    </md-list-item-content>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  to: string | object;
  replace?: boolean;
  append?: boolean;
  exact?: boolean;
  activeClass?: string;
  exactActiveClass?: string;
  ariaCurrentValue?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  disabled?: boolean;
}

const props = defineProps<Props>();

const isDisabled = computed(() => props.disabled);

const routerProps = computed(() => ({
  to: props.to,
  replace: props.replace,
  append: props.append,
  exact: props.exact,
  activeClass: props.activeClass,
  exactActiveClass: props.exactActiveClass,
  ariaCurrentValue: props.ariaCurrentValue,
}));

defineOptions({
  name: 'MdListItemRouter',
});
</script>
