<template>
  <div :id="id" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Yasqe from '@triply/yasqe';

// Props
interface Props {
  id?: string;
  value?: string;
  endpoint?: string;
  showBtns?: boolean;
  readOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => 'YASQE',
  value: () => '',
  endpoint: () => '/api/knowledge/sparql',
  showBtns: true,
  readOnly: false,
});

// Emits
const emit = defineEmits<{
  'query-error': [args: any];
  'query-success': [response: any];
  input: [value: string];
}>();

// Store
const store = useStore();

// Component instance
const yasqe = ref<any>(null);
const editorValue = ref(props.value);

// Lifecycle
onMounted(() => {
  const token = store.getters['auth/token'];
  const element = document.getElementById(props.id);

  if (element) {
    yasqe.value = new Yasqe(element, {
      showQueryButton: props.showBtns,
      requestConfig: {
        endpoint: props.endpoint,
        method: 'POST',
        headers: () => ({
          authorization: 'Bearer ' + token,
        }),
      },
    });

    // Set readOnly after initialization if needed
    if (props.readOnly) {
      yasqe.value.setReadOnly(true);
    }

    yasqe.value.setValue(props.value);
    setTimeout(() => yasqe.value.refresh(), 1);

    yasqe.value.on('error', function () {
      console.error('YASQE query error', arguments);
      emit('query-error', arguments);
    });

    yasqe.value.on('queryResults', function (yasqeInstance: any, response: any, duration: any) {
      emit('input', yasqe.value.getValue());
      emit('query-success', response);
    });
  }
});

// Watchers
watch(
  () => props.value,
  (value) => {
    if (value !== editorValue.value && yasqe.value) {
      yasqe.value.setValue(value);
    }
  }
);

// Component name for debugging
defineOptions({
  name: 'yasqe',
});
</script>

<style css src="@triply/yasqe/build/yasqe.min.css"></style>
