<template>
  <div class="section_contact_text-editor">
    <div class="md-layout md-alignment-center-right">
      <button @click="applyHeading" class="md-button md-dense md-icon-button">
        <b style="font-size: 15px">H</b>
      </button>
      <button @click="applyBold" class="md-button md-dense md-icon-button">
        <MdIcon class="utility-navfonticon">format_bold</MdIcon>
      </button>
      <button @click="applyItalic" class="md-button md-dense md-icon-button">
        <MdIcon class="utility-navfonticon">format_italic</MdIcon>
      </button>

      <button @click="applyUl" class="md-button md-dense md-icon-button">
        <MdIcon class="utility-navfonticon">format_list_bulleted</MdIcon>
      </button>
      <button @click="applyOl" class="md-button md-dense md-icon-button">
        <MdIcon class="utility-navfonticon">format_list_numbered</MdIcon>
      </button>

      <button @click="undo" class="md-button md-dense md-icon-button">
        <MdIcon class="utility-navfonticon">undo</MdIcon>
      </button>
      <button @click="redo" class="md-button md-dense md-icon-button">
        <MdIcon class="utility-navfonticon">redo</MdIcon>
      </button>
    </div>
    <div @input="onInput" v-html="innerValue" :contenteditable="contentEditable" class="editor" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
// Vue Material components are globally registered

// Component name for debugging
defineOptions({
  name: 'TextEditor',
});

// Props
interface Props {
  value?: string;
  contentEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  contentEditable: true,
});

// Store
const store = useStore();

// Reactive data
const innerValue = ref(props.value);

// Watch for prop changes
watch(
  () => props.value,
  (newValue) => {
    innerValue.value = newValue;
  }
);

// Methods
const onInput = (event: Event) => {
  const target = event.target as HTMLElement;
  store.commit('contact/setMessage', target.innerHTML);
};

const applyBold = () => {
  document.execCommand('bold');
};

const applyItalic = () => {
  document.execCommand('italic');
};

const applyHeading = () => {
  if (document.queryCommandValue('formatBlock') === 'h1') {
    return document.execCommand('formatBlock', false, 'div');
  }
  document.execCommand('formatBlock', false, '<h1>');
};

const applyUl = () => {
  document.execCommand('insertUnorderedList');
};

const applyOl = () => {
  document.execCommand('insertOrderedList');
};

const undo = () => {
  document.execCommand('undo');
};

const redo = () => {
  document.execCommand('redo');
};
</script>
