<template>
  <md-field class="md-autocomplete" :class="fieldClasses" md-clearable :md-inline="isBoxLayout">
    <md-menu
      md-direction="bottom-start"
      :md-dense="mdDense"
      md-align-trigger
      md-full-width
      :md-active="showMenu"
      @update:md-active="showMenu = $event"
    >
      <md-input
        v-model="searchTerm"
        v-bind="$attrs"
        :id="mdInputId"
        :name="mdInputName"
        :maxlength="mdInputMaxlength"
        :placeholder="mdInputPlaceholder"
        @focus.stop="openOnFocus"
        @blur="hideOptions"
        @input="onInput"
        @click.stop.prevent="openOnFocus"
      />

      <md-menu-content :class="contentClasses" v-show="hasScopedEmptySlot || hasFilteredItems">
        <div class="md-autocomplete-loading" v-if="isPromisePending">
          <md-progress-spinner :md-diameter="40" :md-stroke="4" md-mode="indeterminate" />
        </div>

        <div class="md-autocomplete-items" v-if="hasFilteredItems">
          <md-menu-item
            v-for="(item, index) in getOptions()"
            :key="index"
            @click="selectItem(item, $event)"
          >
            <slot
              name="md-autocomplete-item"
              :item="item"
              :term="searchTerm"
              v-if="$slots['md-autocomplete-item']"
            />
            <template v-else>{{ item }}</template>
          </md-menu-item>
        </div>

        <md-menu-item v-else-if="hasScopedEmptySlot">
          <div class="md-autocomplete-empty">
            <slot name="md-autocomplete-empty" :term="searchTerm" />
          </div>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <slot />
  </md-field>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, useSlots } from 'vue';
import fuzzy from 'fuzzysearch';
import isPromise from 'is-promise';

interface Props {
  modelValue: any;
  mdDense?: boolean;
  mdLayout?: 'floating' | 'box';
  mdOpenOnFocus?: boolean;
  mdFuzzySearch?: boolean;
  mdOptions: any[] | Promise<any[]>;
  mdInputName?: string;
  mdInputId?: string;
  mdInputMaxlength?: string | number;
  mdInputPlaceholder?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  mdLayout: 'floating',
  mdOpenOnFocus: true,
  mdFuzzySearch: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: any];
  'md-changed': [value: string];
  'md-opened': [];
  'md-closed': [];
  'md-selected': [item: any];
}>();

const searchTerm = ref(props.modelValue);
const showMenu = ref(false);
const triggerPopover = ref(false);
const isPromisePending = ref(false);
const filteredAsyncOptions = ref<any[]>([]);

const isBoxLayout = computed(() => {
  return props.mdLayout === 'box';
});

const fieldClasses = computed((): string => {
  if (isBoxLayout.value) {
    return 'md-autocomplete-box';
  }
  return '';
});

const contentClasses = computed(() => {
  if (isBoxLayout.value) {
    return 'md-autocomplete-box-content';
  }
  return '';
});

const shouldFilter = computed(() => {
  if (isPromiseCheck(props.mdOptions)) {
    return false;
  }
  return (props.mdOptions as any[])[0] && searchTerm.value;
});

const filteredStaticOptions = computed(() => {
  if (isPromiseCheck(props.mdOptions)) {
    return false;
  }

  const options = props.mdOptions as any[];
  const firstItem = options[0];

  if (shouldFilter.value) {
    if (typeof firstItem === 'string') {
      return filterByString();
    } else if (typeof firstItem === 'object') {
      return filterByObject();
    }
  }

  return options;
});

const hasFilteredItems = computed(() => {
  const staticOptions = filteredStaticOptions.value;
  return (
    (Array.isArray(staticOptions) ? staticOptions.length > 0 : false) ||
    filteredAsyncOptions.value.length > 0
  );
});

const hasScopedEmptySlot = computed(() => {
  return !!useSlots()['md-autocomplete-empty'];
});

const getOptions = () => {
  if (isPromiseCheck(props.mdOptions)) {
    return filteredAsyncOptions.value;
  }

  return filteredStaticOptions.value;
};

const isPromiseCheck = (obj: any) => {
  return isPromise(obj);
};

const matchText = (item: any) => {
  const target = item.toLowerCase();
  const search = searchTerm.value.toLowerCase();

  if (props.mdFuzzySearch) {
    return fuzzy(search, target);
  }

  return target.includes(search);
};

const filterByString = () => {
  return (props.mdOptions as any[]).filter((item: any) => matchText(item));
};

const filterByObject = () => {
  return (props.mdOptions as any[]).filter((item: any) => {
    const values = Object.values(item);
    const valuesCount = values.length;

    for (let i = 0; i <= valuesCount; i++) {
      if (typeof values[i] === 'string' && matchText(values[i])) {
        return true;
      }
    }
  });
};

const openOnFocus = () => {
  if (props.mdOpenOnFocus) {
    showOptions();
  }
};

const onInput = (value: any) => {
  emit('update:modelValue', value);

  if (!props.mdOpenOnFocus) {
    showOptions();
  }

  if (
    searchTerm.value.constructor
      .toString()
      .match(/function (\w*)/)?.[1]
      .toLowerCase() !== 'inputevent'
  ) {
    emit('md-changed', searchTerm.value);
  }
};

const showOptions = () => {
  if (showMenu.value) {
    return false;
  }

  showMenu.value = true;
  nextTick(() => {
    triggerPopover.value = true;
    emit('md-opened');
  });
};

const hideOptions = () => {
  nextTick(() => {
    triggerPopover.value = false;
    emit('md-closed');
  });
};

const selectItem = (item: any, $event: Event) => {
  const content = ($event.target as HTMLElement).textContent?.trim() || '';

  searchTerm.value = content;
  emit('update:modelValue', item);
  emit('md-selected', item);
  hideOptions();
};

watch(
  () => props.mdOptions,
  () => {
    if (isPromiseCheck(props.mdOptions)) {
      isPromisePending.value = true;
      (props.mdOptions as Promise<any[]>).then((options: any[]) => {
        filteredAsyncOptions.value = options;
        isPromisePending.value = false;
      });
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => props.modelValue,
  (val) => {
    searchTerm.value = val;
  }
);

defineOptions({
  name: 'MdAutocomplete',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdElevation/mixins.scss';
@import '../MdLayout/mixins.scss';

.md-autocomplete {
  .md-menu {
    width: 100%;
    display: flex;
  }
}

.md-autocomplete-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.md-field.md-inline.md-autocomplete-box {
  @include md-elevation(2);
  padding-top: 2px;
  border-radius: 2px;

  &.md-focused {
    z-index: 120;
  }

  &:before,
  &:after {
    display: none;
  }

  .md-toolbar & {
    min-height: 40px;
    height: 40px;
    margin: 0;
    box-shadow: none;
  }

  .md-menu {
    align-items: center;
  }

  .md-input {
    padding-left: 16px;
  }

  &.md-focused label,
  label,
  .md-input-action {
    top: 50%;
    transform: translateY(-50%);
  }

  .md-input-action {
    right: 8px;
  }

  &.md-focused label,
  label {
    margin-top: 2px;
    left: 16px;
  }
}

.md-autocomplete-box-content:after {
  height: 6px;
  position: absolute;
  top: -6px;
  right: 0;
  left: 0;
  z-index: 120;
  border-bottom: 1px solid;
  content: '';
}
</style>
