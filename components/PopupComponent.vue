<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  handleCloseModal: () => void;
  isDown?: boolean;
  hasNoOpacity?: boolean;
}>();
</script>

<template>
  <div
    class="popup"
    :class="{
      popup_opened: isOpen,
      popup_bottom: isDown,
      'popup_no-opacity': hasNoOpacity,
    }"
    @click="handleCloseModal"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.popup {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(18px);
  visibility: hidden;
  z-index: 0;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  -o-transition:
    opacity 0.3s,
    visibility 0.3s;
  -ms-transition:
    opacity 0.3s,
    visibility 0.3s;
  -webkit-transition:
    opacity 0.3s,
    visibility 0.3s;
  -moz-transition:
    opacity 0.3s,
    visibility 0.3s;
}

.popup_bottom {
  align-items: end;
}

.popup_opened {
  opacity: 1;
  visibility: visible;
  cursor: default;
}

.popup_no-opacity {
  background: transparent;
  opacity: 1;
  cursor: default;
  backdrop-filter: none;
}
</style>
