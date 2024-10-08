<template>
  <header class="header">
    <template v-if="showSearchResults">
      <button class="back-button" @click="$emit('reset-search')">Go back</button>
      <h1 class="header-search-title">
        Search Results for "<span class="search-query">{{ searchQuery }}</span
        >"
      </h1>
    </template>
    <form v-else class="header-search" @submit.prevent="$emit('search')">
      <img class="header-icon" src="@/assets/search-icon.svg" alt="Search icon" />
      <input
        :value="searchInput"
        @input="$emit('update:searchInput', $event.target.value)"
        class="header-input"
        placeholder="Search for photo"
      />
    </form>
  </header>
</template>

<script setup>
defineProps({
  showSearchResults: Boolean,
  searchQuery: String,
  searchInput: String
})

defineEmits(['reset-search', 'search', 'update:searchInput'])
</script>

<style scoped lang="scss">
.header {
  padding: 90px 9%;
  background-color: #dce2e9;

  .back-button {
    border: none;
    padding: 0;
    outline: none;
    background: none;
    font-size: 16px;
    color: var(--secondary-color);
  }

  .header-search-title {
    color: var(--primary-color);
    font-size: 40px;
  }

  .search-query {
    color: var(--secondary-color);
    text-transform: capitalize;
  }

  &-search {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 26px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 15px 30px rgba(0, 0, 0.1, 0.08);

    .header-icon {
      margin-right: 20px;
    }

    .header-input {
      padding: 0;
      width: 100%;
      height: 100%;
      border: none;
      font-size: 18px;

      &:focus {
        outline: none;
        border: none;
      }

      &::placeholder {
        color: var(--primary-color);
      }
    }
  }
}
</style>
