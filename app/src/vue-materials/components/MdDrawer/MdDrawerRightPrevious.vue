<template>
  <div v-show="false" class="md-drawer md-right-previous" :class="drawerClasses"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import createMdPropValidator from '../../core/utils/MdPropValidator';

export default defineComponent({
  name: 'MdDrawer',
  props: {
    mdTheme: {
      type: String,
      default: null,
    },
    mdPermanent: {
      type: String,
      ...createMdPropValidator('md-permanent', ['full', 'clipped', 'card']),
    },
    mdPersistent: {
      type: String,
      ...createMdPropValidator('md-persistent', ['mini', 'full']),
    },
    mdActive: Boolean,
    mdFixed: Boolean,
  },
  computed: {
    $mdActiveTheme() {
      // Simple theme implementation
      return this.mdTheme || 'default';
    },
    drawerClasses() {
      let classes: any = {
        'md-temporary': this.isTemporary,
        'md-persistent': this.mdPersistent,
        'md-permanent': this.mdPermanent,
        'md-active': this.mdActive,
        'md-fixed': this.mdFixed,
      };

      if (this.mdPermanent) {
        classes['md-permanent-' + this.mdPermanent] = true;
      }

      if (this.mdPersistent) {
        classes['md-persistent-' + this.mdPersistent] = true;
      }

      return classes;
    },
    isTemporary() {
      return !this.mdPermanent && !this.mdPersistent;
    },
  },
});
</script>
