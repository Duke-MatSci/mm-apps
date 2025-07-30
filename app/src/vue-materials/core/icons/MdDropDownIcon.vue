<template>
  <md-icon class="md-icon-image" v-once>
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10l5 5 5-5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </md-icon>
</template>

<script setup lang="ts">
import MdIcon from '../../components/MdIcon/MdIcon.vue';

defineOptions({
  name: 'MdDropDownIcon',
  components: {
    MdIcon,
  },
});
</script>
