<template>
  <a
    class="md-list-item-link"
    :href="href"
    :download="download"
    :hreflang="hreflang"
    :ping="ping"
    :rel="rel"
    :target="target"
    :type="type"
  >
    <md-list-item-content :md-disabled="isDisabled">
      <slot />
    </md-list-item-content>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  download?: string;
  href?: string;
  hreflang?: string;
  ping?: string;
  rel?: string;
  target?: string;
  type?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const isDisabled = computed(() => props.disabled);

defineOptions({
  name: 'MdListItemLink',
});
</script>
