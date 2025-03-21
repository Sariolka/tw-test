<script setup lang="ts">

const email = ref('')
const password = ref('')
</script>

<template>
<section class="login">
  <form class="login__form" id="login" novalidate>
    <div class="login__container">
      <label for="email">Email</label>
      <input class="login__input" v-model="email" type="email" id="email" />
<!--      <span class="login__error">{{ errors.email }}</span>-->
    </div>

    <div class="login__container">
      <label for="password">Password</label>
      <input
          v-model="password"
          class="login__input"
          type="password"
          id="password"
          minlength="6"
      />
<!--      <span class="login__error">{{ errors.password }}</span>-->
    </div>
    <button class="login__button" type="submit">Войти</button>
  </form>
</section>
</template>

<style scoped>

</style>