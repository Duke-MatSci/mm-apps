<script lang="ts">
import { defineComponent, h } from 'vue';
import MdAppSideDrawer from './MdAppSideDrawer.vue';
import MdAppInternalDrawer from './MdAppInternalDrawer.vue';
import MdDrawerRightPrevious from '../MdDrawer/MdDrawerRightPrevious.vue';

const componentTypes = ['md-app-toolbar', 'md-app-drawer', 'md-app-content'];

function normilizeTagName(tagName: string) {
  return tagName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function isValidChild(componentOptions: any) {
  return componentOptions && componentTypes.includes(normilizeTagName(componentOptions.tag));
}

function isRightDrawer(propsData: any) {
  if (!propsData) return false;
  return propsData.mdRight === '' || !!propsData.mdRight;
}

function shouldRenderSlot(data: any, componentOptions: any) {
  return (data && componentTypes.includes(data.slot)) || isValidChild(componentOptions);
}

function generateAttrKeys(attrs: any) {
  return JSON.stringify({
    persistent: attrs && attrs['md-persistent'],
    permanent: attrs && attrs['md-permanent'],
  });
}

function buildSlots(
  children: any[],
  context: any,
  functionalContext: any,
  options: any,
  createElement: any
) {
  let slots: any[] = [];
  let hasDrawer = false;

  if (children) {
    children.forEach((child) => {
      const data = child.data;
      const componentOptions = child.componentOptions;

      if (shouldRenderSlot(data, componentOptions)) {
        const slotName = data.slot || normilizeTagName(componentOptions.tag);
        child.data.slot = slotName;

        if (slotName === 'md-app-drawer') {
          const isRight = isRightDrawer(componentOptions.propsData);

          if (hasDrawer) {
            console.warn(`There shouldn't be more than one drawer in a MdApp at one time.`);
            return;
          }

          hasDrawer = true;
          child.data.slot += `-${isRight ? 'right' : 'left'}`;
          child.key = generateAttrKeys(data.attrs);

          if (isRight) {
            const drawerRightPrevious = createElement(MdDrawerRightPrevious, {
              props: { ...child.data.attrs },
            });
            drawerRightPrevious.data.slot = 'md-app-drawer-right-previous';
            slots.push(drawerRightPrevious);
          }
        }

        child.data.provide = options.Ctor.options.provide;
        child.context = context;
        child.functionalContext = functionalContext;

        slots.push(child);
      }
    });
  }

  return slots;
}

function getDrawers(children: any[]) {
  const drawerVnodes = children.filter((child) => {
    const tag = child.data.slot || normilizeTagName(child.componentOptions.tag);
    return ['md-app-drawer', 'md-app-drawer-right', 'md-app-drawer-left'].indexOf(tag) > -1;
  });
  return drawerVnodes.length ? drawerVnodes : [];
}

function hasInternalDrawer(attrs: any) {
  const mdPermanent = attrs && attrs['md-permanent'];
  return mdPermanent && (mdPermanent === 'clipped' || mdPermanent === 'card');
}

export default defineComponent({
  name: 'MdApp',
  functional: true,
  render(createElement: any, { children, props, data }: any) {
    let appComponent = MdAppSideDrawer;
    const { context, functionalContext, componentOptions } = createElement(appComponent);
    const slots = buildSlots(children, context, functionalContext, componentOptions, createElement);
    const drawers = getDrawers(slots);

    drawers.forEach((drawer: any) => {
      if (drawer && hasInternalDrawer(drawer.data.attrs)) {
        appComponent = MdAppInternalDrawer;
      }
    });

    const staticClass: any = {};
    if (data.staticClass) {
      data.staticClass.split(/\s+/).forEach((name: string) => {
        if (name.length === 0) return;
        staticClass[name] = true;
      });
    }

    return createElement(
      appComponent,
      {
        attrs: props,
        class: { ...staticClass, ...data.class },
        style: { ...data.staticStyle, ...data.style },
      },
      slots
    );
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables';
@import '../MdLayout/mixins';

.md-app {
  display: flex;
  overflow: hidden;
  position: relative;

  &.md-fixed {
    .md-app-scroller {
      overflow: auto;
    }
  }

  &.md-reveal,
  &.md-fixed-last,
  &.md-overlap,
  &.md-flexible {
    transform: translate3d(0, 0, 0);

    .md-app-toolbar {
      position: absolute;
      top: 0;
    }
  }

  &.md-flexible,
  &.md-overlap {
    .md-app-toolbar {
      min-height: 0;
    }
  }

  &.md-flexible {
    .md-toolbar-row {
      &:first-child {
        z-index: 2;
      }

      &:last-child {
        position: fixed;
        bottom: 0;
        z-index: 1;
      }
    }

    .md-display-1 {
      position: fixed;
    }
  }

  &.md-overlap {
    .md-app-toolbar {
      z-index: 1;
    }

    .md-app-content {
      margin: -64px 24px 24px;
      position: relative;
      z-index: 2;

      @include md-layout-small {
        margin: -64px 16px 16px;
      }

      @include md-layout-xsmall {
        margin: -64px 8px 8px;
      }
    }
  }
}

.md-app-drawer {
  &.md-permanent-card + .md-app-scroller .md-content {
    @include md-layout-small-and-up {
      padding-left: 0;
      padding-right: 0;
      border-left: none;
      border-right: none;
    }
  }
}

.md-app-content {
  padding: 16px;

  @include md-layout-small-and-up {
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  > p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.md-app-container {
  flex: 1;
  display: flex;
  overflow: auto;
  transform: translate3D(0, 0, 0);
  transition: padding-left 0.4s $md-transition-default-timing,
    padding-right 0.4s $md-transition-default-timing;
  will-change: padding-left, padding-right;
}

.md-app-scroller {
  flex: 1;
}
</style>
