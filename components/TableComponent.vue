<script setup lang="ts">
import type { IData } from '~/types/types';
import { formatShortDate } from '~/helpers/dateFormatter';

const props = defineProps<{
  data: IData[] | null;
}>();

const keys = computed(() => (props.data ? Object.keys(props.data[0]) : []));
const data = ref(props.data);

watch(
  () => props.data,
  (newValue) => {
    data.value = newValue;
  },
);

const getTitle = (key: string) => {
  switch (key) {
    case 'status':
      return 'Наличие';
    case 'date_created':
      return 'Дата добавления';
    case 'name':
      return 'Модель';
    case 'brand':
      return 'Производитель';
    case 'price':
      return 'Цена';
    case 'color':
      return 'Цвет';
    case 'stock':
      return 'В наличии шт.';
    default:
      return key;
  }
};
</script>

<template>
  <div class="table">
    <div class="table__head">
      <div class="table__row">
        <div class="table__cell table__cell_type-head" v-for="key in keys" :key="key">
          {{ getTitle(key) }}
        </div>
      </div>
    </div>
    <div class="table__body">
      <div class="table__row" v-for="phone in data" :key="phone.id">
        <div class="table__cell" v-for="key in keys" :key="key">
          {{ key === 'date_created' ? formatShortDate(phone[key]) : phone[key] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: table;
  max-width: 1200px;
  min-width: 860px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-collapse: collapse;
  border-radius: 8px;
  padding-left: 14px;
  padding-right: 14px;
  font-family: 'Inter', 'Arial', sans-serif;
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: #000;

  &__row {
    display: table-row;
    width: 100%;
    border-bottom: 1px solid #e2e8f0;
  }

  &__cell {
    display: table-cell;
    padding: 10px;
    text-align: center;
    vertical-align: center;

    &_type-head {
      padding-left: 20px;
      padding-right: 20px;
    }

    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }

  &__body {
    display: table-row-group;
  }

  &__head {
    display: table-header-group;
    background-color: darkgrey;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
