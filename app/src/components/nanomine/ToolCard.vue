<template>
  <MdCard class="md-layout-item">
    <MdCardHeader key="tool_title">
      <MdCardHeaderText>
        <div class="md-title">
          <slot name="title"></slot>
        </div>
      </MdCardHeaderText>
      <MdCardMedia class="tool_card_image" key="image" md-big>
        <slot name="image"></slot>
      </MdCardMedia>
    </MdCardHeader>
    <MdCardContent>
      <slot name="content"></slot>
    </MdCardContent>
    <MdCardActions>
      <slot name="actions"></slot>
    </MdCardActions>
  </MdCard>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ToolCard',
});
</script>

<style scoped>
.tool_card_image {
  width: 33%;
}
</style>
