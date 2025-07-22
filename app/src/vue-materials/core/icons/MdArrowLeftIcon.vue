<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </svg>
  </md-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdIcon from '../../components/MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'MdArrowLeftIcon',
  components: {
    MdIcon,
  },
});
</script>
