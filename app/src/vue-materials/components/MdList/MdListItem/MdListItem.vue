<template>
  <li class="md-list-item">
    <component :is="listComponent" v-bind="componentProps" :class="componentClass">
      <template #default>
        <slot />
      </template>
      <template #md-expand v-if="hasExpansionComputed">
        <slot name="md-expand" />
      </template>
    </component>
  </li>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue';
import MdListItemDefault from './MdListItemDefault.vue';
import MdListItemFakeButton from './MdListItemFakeButton.vue';
import MdListItemButton from './MdListItemButton.vue';
import MdListItemLink from './MdListItemLink.vue';
import MdListItemRouter from './MdListItemRouter.vue';
import MdListItemExpand from './MdListItemExpand.vue';

interface Props {
  mdExpand?: boolean;
  disabled?: boolean;
  to?: string | object;
  href?: string;
  download?: string;
  hreflang?: string;
  ping?: string;
  rel?: string;
  target?: string;
  type?: string;
  replace?: boolean;
  append?: boolean;
  exact?: boolean;
  activeClass?: string;
  exactActiveClass?: string;
  ariaCurrentValue?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
}

const props = defineProps<Props>();
const slots = useSlots();
const attrs = useAttrs();

function hasExpansion(props: any) {
  if (!props) return false;
  return Object.prototype.hasOwnProperty.call(props, 'mdExpand') && props.mdExpand !== false;
}

function hasChildrenButtons(children: any) {
  if (!children || !children.default) return false;
  return children.default.some(
    (child: any) => child.type?.name === 'MdButton' || child.type?.__name === 'MdButton'
  );
}

function shouldRenderButtonWithListener(listeners: any) {
  if (!listeners) return false;
  const interactionEvents = [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mousemove',
    'mouseover',
    'mouseout',
    'mouseenter',
    'mouseleave',
    'keydown',
    'keyup',
    'keypress',
    'focus',
    'blur',
    'input',
    'change',
    'submit',
  ];

  return Object.keys(listeners).some((listener) => interactionEvents.includes(listener));
}

function isRouterLink(props: any) {
  if (!props) return false;
  return props.to !== undefined;
}

function createListComponent(props: any, listeners: any, children: any) {
  if (!props) return MdListItemDefault;

  if (hasExpansion(props)) {
    return MdListItemExpand;
  }

  if (props.disabled) {
    return MdListItemButton;
  }

  if (isRouterLink(props)) {
    return MdListItemRouter;
  }

  if (props.href) {
    return MdListItemLink;
  }

  if (shouldRenderButtonWithListener(listeners)) {
    if (hasChildrenButtons(children)) {
      return MdListItemFakeButton;
    }
    return MdListItemButton;
  }

  return MdListItemDefault;
}

// Create the static class - handle class binding carefully to prevent duplication
const staticClass = computed(() => {
  const baseClass = 'md-list-item';

  if (!attrs.class) {
    return baseClass;
  }

  // Ensure we only add the class once
  let additionalClasses = '';

  if (typeof attrs.class === 'string') {
    additionalClasses = attrs.class;
  } else if (Array.isArray(attrs.class)) {
    additionalClasses = attrs.class.join(' ');
  } else if (typeof attrs.class === 'object' && attrs.class !== null) {
    const classNames = Object.keys(attrs.class as Record<string, any>).filter(
      (key) => (attrs.class as Record<string, any>)[key]
    );
    additionalClasses = classNames.join(' ');
  }

  // Remove any duplicate classes
  const allClasses = [baseClass, ...additionalClasses.split(' ')].filter(Boolean);
  const uniqueClasses = [...new Set(allClasses)];

  console.log('staticClass computed - allClasses:', allClasses, 'uniqueClasses:', uniqueClasses);
  return uniqueClasses.join(' ');
});

// Create the component class - only base classes, no passed classes
const componentClass = computed(() => {
  return 'md-list-item-container md-button-clean';
});

// Create component props - exclude class from attrs to prevent duplication
const componentProps = computed(() => {
  // Extract all attributes except class to prevent duplication
  const { class: _, ...otherAttrs } = attrs;

  // Also exclude any class-related props from the main props
  const { class: __, ...otherProps } = props as any;

  return { ...otherProps, ...otherAttrs };
});

// Determine which component to render
const listComponent = computed(() => {
  return createListComponent(props, attrs, slots);
});

// Check if this item has expansion
const hasExpansionComputed = computed(() => hasExpansion(props));

defineOptions({
  name: 'MdListItem',
});
</script>

<style lang="scss">
@import '../../MdAnimation/variables.scss';
@import '../theme.scss';

.md-list-item {
  height: auto;
  position: relative;
  z-index: 2;

  &.md-inset {
    .md-list-item-content {
      padding-left: 72px;
    }
  }

  .md-icon {
    margin: 0;
    transition-property: color, margin-right;
  }

  // Add hover effects for expandable items
  &.md-list-item-expand {
    &:not(.md-list-item-default):not([disabled]) {
      > .md-list-item-content:hover {
        background-color: rgba(0, 0, 0, 0.12) !important;
        color: inherit !important;
      }
    }
  }
}

.md-list-item-container {
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  text-transform: none;

  &:not(.md-list-item-default):not([disabled]) {
    > .md-list-item-content {
      user-select: none;
      cursor: pointer;
    }
  }

  &.md-button-clean:hover {
    opacity: 1;
    text-decoration: none;
  }

  // Add hover effects for list items
  &:not(.md-list-item-default):not(.md-list-item-expand):not([disabled]):hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
    color: inherit !important;
  }
}

.md-list-item-content {
  min-height: 48px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: padding 0.4s $md-transition-stand-timing;
  will-change: padding;

  .md-list.md-dense & {
    min-height: 40px;
    font-size: 13px;

    > .md-avatar {
      margin-top: 0;
      margin-bottom: 0;

      &:not(.md-small) {
        width: 36px;
        min-width: 36px;
        height: 36px;
      }

      &:first-child {
        margin-right: 20px;
      }
    }
  }

  .md-list.md-double-line & {
    min-height: 72px;
  }

  .md-list.md-double-line.md-dense & {
    min-height: 60px;
  }

  .md-list.md-triple-line & {
    min-height: 88px;
  }

  .md-list.md-triple-line.md-dense & {
    min-height: 76px;
  }

  .md-list-action {
    margin: 0 -10px 0 0;

    &:last-of-type {
      margin: 0 -10px 0 16px;

      .md-list.md-triple-line & {
        align-self: flex-start;
      }
    }
  }

  > .md-icon:first-child {
    margin-right: 32px;
  }

  > .md-icon:last-child {
    margin-left: 16px;
  }

  > .md-checkbox,
  > .md-radio {
    margin: 0;

    &:first-child {
      margin-right: 36px;
    }
  }

  > .md-switch {
    margin: 0;

    &:first-child {
      margin-right: 22px;
    }
  }

  > .md-avatar {
    margin: 4px 0;

    &:first-child {
      margin-right: 16px;
    }
  }
}

.md-list-item-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  line-height: 1.25em;
  white-space: nowrap;

  .md-list.md-dense & {
    font-size: 13px;
  }

  * {
    width: 100%;
    margin: 0;
    overflow: hidden;
    line-height: 1.25em;
    text-overflow: ellipsis;
  }

  :nth-child(2),
  :nth-child(3) {
    font-size: 14px;
  }

  .md-list.md-dense & * {
    font-size: 13px;
  }
}
</style>
