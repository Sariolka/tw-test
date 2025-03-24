<script setup lang="ts">
import type { IData } from '~/types/types';
import type { ComputedRef } from 'vue';
import { useAuthStore } from '~/stores';

const dataArray = ref<IData[]>([]);
const store = useAuthStore();
const router = useRouter();
const isLoading = ref(true);
const originalData = ref<IData[]>([]);
const selected = ref('value1');

const user = computed(() => {
  return store.currentUser;
});

//Переброс на страницу входа
const pushToLogin = () => {
  router.push('/');
};

//Выход
const handleLogout = async () => {
  isLoading.value = true;
  try {
    await store.logout();
    pushToLogin();
  } catch (error) {
    console.log('Что-то пошло не так:', error);
  } finally {
    isLoading.value = false;
  }
};

//получение данных
const getData = async () => {
  try {
    const { data, error } = await useFetch('/api/data');

    if (error.value) {
      throw new Error(error.value.message);
    }

    if (data.value) {
      const parsedData = data.value.data as IData[];
      dataArray.value = parsedData;
      originalData.value = parsedData.slice();
    }
  } catch (e) {
    console.error('Ошибка при получении данных:', e);
  }
};

const loadPage = async () => {
  try {
    if (!store.currentUser) {
      pushToLogin();
      return;
    } else {
      await getData();
    }
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await store.initialize(); //ожидание инициализации пользователя!
  await loadPage();
});

//Выбор селекта
const updateSelected = (value: string) => {
  selected.value = value;
};

//Вычисление данных для отображения в таблице
const filteredData: ComputedRef<IData[]> = computed(() => {
  if (!dataArray.value) {
    return [];
  }

  let dataToDisplay = [...dataArray.value];
  if (dataArray.value) {
    if (selected.value === 'value1') {
      dataToDisplay = [...originalData.value];
    }
    if (selected.value === 'value2') {
      dataToDisplay = [...dataArray.value].sort((a, b) => a.date_created - b.date_created);
    } else if (selected.value === 'value3') {
      dataToDisplay = [...dataArray.value].sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (selected.value === 'value4') {
      dataToDisplay = [...dataArray.value].sort((a, b) => b.price - a.price);
    } else if (selected.value === 'value5') {
      dataToDisplay = [...dataArray.value].sort((a, b) => a.price - b.price);
    } else if (selected.value === 'value6') {
      dataToDisplay.sort((a, b) => (a.status === 'В наличии' ? -1 : 1));
    }
    return dataToDisplay;
  }
});
</script>

<template>
  <section class="main-page" :class="{ 'main-page_loading': isLoading }">
    <div class="main-page__loading" v-if="isLoading">
      <SpinnerComponent class="main-page__spinner" />
    </div>
    <div class="main-page__content" v-else>
      <div class="main-page__user-control">
        Пользователь:&nbsp;<strong>{{ user }} &emsp;</strong>
        <button class="main-page__btn-exit" @click="handleLogout" :disabled="isLoading">
          Выйти
        </button>
      </div>
      <div class="main-page__table-container">
        <SelectComponent :selected="selected" @update:selected="updateSelected" />
        <TableComponent v-if="filteredData" :data="filteredData" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  height: 100%;

  &_loading {
    align-items: center;
    justify-content: center;
  }

  &__table-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 50px;
  }

  &__btn-exit {
    width: 150px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 4px;
    cursor: pointer;
    padding: 7px 19.5px;
    background-color: #e2e8f0;
    transition: opacity 0.3s ease-in-out;

    &:hover {
      opacity: 0.7;
    }
  }

  &__user-control {
    display: flex;
    align-items: center;
    font-family: 'Inter', 'Arial', sans-serif;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    color: #000;
    align-self: end;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
  }

  &__spinner {
    width: 60px;
    height: 60px;
  }
}
</style>
