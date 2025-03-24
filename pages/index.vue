<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useAuthStore } from '~/stores';

const errorText = ref('');
const router = useRouter();
const store = useAuthStore();

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: 'Поле не может быть пустым' })
      .email({ message: 'Введите корректный email' }),
    password: zod
      .string()
      .nonempty('Пароль обязателен')
      .min(1, { message: 'Поле не может быть пустым' })
      .min(6, { message: 'Введите не менее 6 символов' }),
  }),
);

const pushToMain = () => {
  router.push('/account');
};

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
});

const { value: email } = useField('email');

const { value: password } = useField('password');

const handleSignin = async (email: string, password: string) => {
  errorText.value = '';
  try {
    const user = {
      email: email,
      password: password,
    };
    const res = await $fetch('/api/login', {
      method: 'post',
      body: { user },
    });
    if (res.statusCode > 399) {
      errorText.value = res.message;
    }
    if (res.statusCode === 200) {
      store.setUser(res.user.name + ' ' + res.user.surname);
      pushToMain();
    }
  } catch (error: any) {
    console.error(error);
    errorText.value = error;
  }
};

const onSubmit = handleSubmit(async (values) => {
  await handleSignin(values.email, values.password);
});
</script>

<template>
  <section class="login">
    <form class="login__form" id="login" novalidate @submit.prevent="onSubmit">
      <h1 class="login__title">Авторизация</h1>
      <div class="login__container">
        <label for="email" class="login__label">Логин</label>
        <input
          class="login__input"
          :class="{ 'login__input_type-error': errors.email || errorText }"
          v-model.lazy="email"
          placeholder="Введите логин"
          type="email"
          id="email"
        />
        <span class="login__error">{{ errors.email }}</span>
      </div>

      <div class="login__container">
        <label for="password" class="login__label">Пароль</label>
        <input
          v-model.lazy="password"
          class="login__input"
          :class="{ 'login__input_type-error': errors.password || errorText }"
          type="password"
          placeholder="Введите пароль"
          id="password"
          minlength="6"
        />
        <span class="login__error">{{ errors.password }}</span>
      </div>
      <button class="login__button" type="submit" :disabled="isSubmitting">
        Войти
        <SpinnerComponent v-if="isSubmitting" class="login__spinner" />
        <span class="login__error">{{ errorText }}</span>
      </button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.login {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__form {
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    padding: 25px 50px 50px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  &__title {
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 20px;
    line-height: normal;
    font-style: normal;
    font-weight: 700;
    color: #323131;
    margin-bottom: 45px;
    text-align: center;
  }

  &__label {
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 14px;
    line-height: normal;
    font-style: normal;
    font-weight: 700;
    color: #323131;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 35px;

    &:last-of-type {
      margin-bottom: 60px;
    }
  }

  &__input {
    width: 100%;
    padding: 5px 10px 5px 2px;
    border: transparent;
    outline: transparent;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    font-family: 'Inter', 'Arial', sans-serif;
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    color: #000;

    &_type-error {
      border-color: #b91c1c;
    }

    &:focus {
      border-color: #296db1;
    }
  }

  &__button {
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 16px;
    line-height: 19.36px;
    font-style: normal;
    font-weight: 700;
    gap: 15px;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 19.5px;
    background-color: #e2e8f0;
    transition: opacity 0.3s ease-in-out;
    color: #323131;
    position: relative;

    &:hover {
      opacity: 0.7;
    }
  }

  &__error {
    font-family: 'Inter', 'Arial', sans-serif;
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    line-height: normal;
    color: #b91c1c;
    font-weight: 400;
  }

  &__spinner {
    width: 20px;
    height: 20px;
  }
}
</style>
