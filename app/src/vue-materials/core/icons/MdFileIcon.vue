<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </md-icon>
</template>

<script setup lang="ts">
import MdIcon from '../../components/MdIcon/MdIcon.vue';

defineOptions({
  name: 'MdFileIcon',
  components: {
    MdIcon,
  },
});
</script>
