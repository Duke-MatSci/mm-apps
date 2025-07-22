<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  </md-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdIcon from '../../components/MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'MdArrowRightIcon',
  components: {
    MdIcon,
  },
});
</script>
