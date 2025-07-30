<script lang="ts">
import { defineComponent, h, inject, computed } from 'vue';

export default defineComponent({
  name: 'MdContent',
  props: {
    mdTag: {
      type: String,
      default: 'div',
    },
    mdTheme: {
      type: String,
      default: 'default',
    },
  },
  setup(props, { slots, attrs }) {
    // Inject theme from parent component or use prop
    const mdActiveTheme = inject(
      'mdActiveTheme',
      computed(() => `md-theme-${props.mdTheme}`)
    );

    // Render function
    return () => {
      return h(
        props.mdTag,
        {
          class: ['md-content', mdActiveTheme.value],
          ...attrs,
        },
        slots.default
      );
    };
  },
});
</script>

<style lang="scss">
@import './theme.scss';
</style>
