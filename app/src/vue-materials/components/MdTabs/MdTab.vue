<template>
  <div class="md-tab" :id="String(id)" v-bind="$attrs">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import MdUuid from '../../core/utils/MdUuid';
import MdRouterLink from '../../core/mixins/MdRouterLink/MdRouterLink';
import MdObserveElement from '../../core/utils/MdObserveElement';
import MdRouterLinkProps from '../../core/utils/MdRouterLinkProps';

export default defineComponent({
  name: 'MdTab',
  mixins: [MdRouterLink],
  props: {
    id: {
      type: [String, Number],
      default: () => 'md-tab-' + MdUuid(),
    },
    href: [String, Number],
    mdDisabled: Boolean,
    mdLabel: [String, Number],
    mdIcon: String,
    mdTemplateData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { attrs, slots, emit }) {
    const MdTabs = inject('MdTabs') as any;
    const observer = ref<any>(null);

    const setTabContent = () => {
      const item = MdTabs.items.get(props.id);
      if (item) {
        item.hasContent = !!slots.default;
      }
    };

    const setupObserver = () => {
      nextTick(() => {
        const element = document.querySelector(`#${props.id}`);
        if (element) {
          observer.value = MdObserveElement(
            element,
            {
              childList: true,
            },
            setTabContent
          );
        }
      });
    };

    const getPropValues = () => {
      const propNames = Object.keys(props);
      const ignoredProps = ['id', 'mdLabel', 'mdDisabled', 'mdTemplateData'];
      const values: any = {};

      propNames.forEach((prop) => {
        if (!ignoredProps.includes(prop)) {
          if ((props as any)[prop]) {
            values[prop] = (props as any)[prop];
          } else if (prop in attrs) {
            if (prop) {
              values[prop] = attrs[prop];
            } else {
              values[prop] = true;
            }
          }
        }
      });

      return values;
    };

    const setTabData = () => {
      // MdTabs does not know the order of tabs, as tabs are in a slot: store IDs in the DOM: DOM elements are ordered
      nextTick(() => {
        const element = document.querySelector(`#${props.id}`);
        if (element) {
          (element as any).mdTabIdAsObject = props.id;
        }
      });

      // new Map() because Map is not reactive in VueJs 2
      MdTabs.items = new Map(
        MdTabs.items.set(props.id, {
          id: props.id,
          hasContent: !!slots.default,
          label: props.mdLabel,
          icon: props.mdIcon,
          disabled: props.mdDisabled,
          data: props.mdTemplateData,
          props: getPropValues(),
          events: {},
        })
      );
    };

    watch(
      () => props,
      () => {
        setTabData();
      },
      { deep: true }
    );

    watch(
      () => attrs,
      () => {
        setTabData();
      },
      { deep: true }
    );

    onMounted(() => {
      setupObserver();
      setTabData();
    });

    onBeforeUnmount(() => {
      if (observer.value) {
        observer.value.disconnect();
      }

      MdTabs.items.delete(props.id);
      MdTabs.items = new Map(MdTabs.items); // new Map() because Map is not reactive in VueJs 2
    });
  },
});
</script>
