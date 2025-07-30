<template>
  <div class="md-list-item-default" @click="toggleControl">
    <md-list-item-content :md-disabled="true">
      <slot />
    </md-list-item-content>
  </div>
</template>

<script setup lang="ts">
const toggleControl = () => {
  const control = document.querySelector(
    '.md-checkbox-container, .md-switch-container, .md-radio-container'
  );
  if (control) {
    (control as HTMLElement).click();
  }
};

defineOptions({
  name: 'MdListItemDefault',
});
</script>
