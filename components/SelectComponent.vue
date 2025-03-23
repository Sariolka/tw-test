<script setup lang="ts">
import { computed, ref } from 'vue';
import PopupTemplate from '~/components/PopupComponent.vue';
import { OPTIONS_DATA } from '~/data/constants';

const props = defineProps<{
  selected: string;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: string): void;
}>();

const isDropdownOpen = ref(false);

const options = OPTIONS_DATA;

const selectedLabel = computed(() => {
  const option = options.find((opt) => opt.value === props.selected);
  return option ? option.label : 'Все';
});

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const openDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (value: string) => {
  emit('update:selected', value);
  isDropdownOpen.value = false;
};
</script>

<template>
  <div class="select">
    <p class="select__label">Фильтр -</p>
    <div class="select__title" @click="openDropdown">
      <div class="select__selected">&nbsp; {{ selectedLabel }}</div>
      <div class="select__arrow" :class="{ select__arrow_open: isDropdownOpen }"></div>
    </div>
    <PopupTemplate
      :handle-close-modal="closeDropdown"
      :is-open="isDropdownOpen"
      :has-no-opacity="true"
      v-if="isDropdownOpen"
    ></PopupTemplate>
    <ul
      class="select__options"
      :class="{
        select__options_open: isDropdownOpen,
        select__options_admin: isDropdownOpen,
      }"
    >
      <li
        class="select__option"
        :class="{ selected: props.selected === option.value }"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.select {
  z-index: 300;
  display: flex;
  align-items: center;
  color: #000;
  position: relative;

  &__select {
    display: flex;
    align-items: center;
  }

  &__label {
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 16px;
    line-height: 19.36px;
    font-style: normal;
    font-weight: 700;
    cursor: default;
    margin-bottom: 0;
    margin-top: 0;
  }

  &__option {
    box-sizing: border-box;
    padding: 6px 8px;
    background-color: inherit;
    cursor: pointer;
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 16px;
    line-height: 19.36px;
    font-style: normal;
    font-weight: 400;
    transition: background-color 0.2s linear;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8px;
    color: #575757;
    border-radius: 5px;
    list-style: none;
    &:hover {
      background-color: #f5f5f5;
      border-radius: 5px;
      padding-right: 8px;
    }
    &.selected {
      background-color: #e0e0e0;
      color: #000;
    }
  }

  &__options {
    position: absolute;
    left: 0;
    top: 25px;
    width: 185px;
    display: flex;
    gap: 2.5px;
    flex-direction: column;
    padding: 2px;
    background-color: #fff;
    box-shadow: 0 12px 23px 0 #00000026;
    border-radius: 5px;
    height: 0;
    visibility: hidden;
    overflow: hidden;
    transition:
      height 0.2s ease,
      visibility 0.2s ease;

    &_open {
      height: 200px;
      visibility: visible;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 16px;
    line-height: 19.36px;
    font-style: normal;
    font-weight: 700;
  }

  &__arrow {
    background-image: url('../assets/icons/icon-dropdown.svg');
    background-repeat: no-repeat;
    background-position: center;
    width: 19px;
    height: 19px;
    background-size: contain;
    transition: transform 0.3s ease;

    &_open {
      transform: rotate(180deg);
    }
  }
}
</style>
