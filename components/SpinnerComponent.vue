<script setup lang="ts"></script>

<template>
  <div class="spin"></div>
</template>

<style lang="scss" scoped>
.spin {
  background-image: url('../assets/icons/spinner.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
