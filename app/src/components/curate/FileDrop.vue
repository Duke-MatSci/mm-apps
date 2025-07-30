<template>
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineOptions({ name: 'FileDrop' });

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

const active = ref(false);
let inActiveTimeout: ReturnType<typeof setTimeout> | null = null;

const setActive = () => {
  active.value = true;
  if (inActiveTimeout) {
    clearTimeout(inActiveTimeout);
  }
};

// Timeout avoids style flickering
const setInactive = () => {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
};

const emit = defineEmits<{
  'files-dropped': [files: File[]];
}>();

const onDrop = (e: DragEvent) => {
  setInactive();
  if (e.dataTransfer?.files) {
    emit('files-dropped', [...e.dataTransfer.files]);
  }
};

const preventDefaults = (e: Event) => {
  e.preventDefault();
};

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>
