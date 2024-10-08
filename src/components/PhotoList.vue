<template>
  <div class="photo-list">
    <template v-if="!loading && photos.length">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="photo-list-item"
        @click.prevent="$emit('preview', photo)"
        :style="backgroundStyle(photo.urls.regular)"
      >
        <div class="photo-overlay">
          <div class="photo-info">
            <div>{{ photo.user.name }}</div>
            <small>{{ photo.user.location }}</small>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="loading">
      <div v-for="index in 6" :key="index" class="photo-list-item">
        <div class="photo-placeholder">
          <div class="photo-info">
            <div class="photo-placeholder-text photo-info-title"></div>
            <div class="photo-placeholder-text photo-info-subtitle"></div>
          </div>
        </div>
      </div>
    </template>
    <p v-else>No photos found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  photos: Array,
  loading: Boolean
})

defineEmits(['preview'])

const backgroundStyle = computed(() => (url) => ({
  backgroundImage: `url(${url})`
}))
</script>

<style scoped lang="scss">
.photo-list {
  display: grid;
  grid-row-gap: 40px;
  grid-auto-rows: 20px;
  grid-column-gap: 60px;
  justify-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  .photo-list-item {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &:nth-child(n) {
      grid-row-end: span 8;
    }

    &:nth-child(1) {
      grid-row-end: span 6;
    }

    &:nth-child(2) {
      grid-row-end: span 8;
    }

    &:nth-child(3) {
      grid-row-end: span 7;
    }
  }

  @media only screen and (min-width: 998px) {
    .images {
      grid-template-columns: repeat(3, minmax(300px, 1fr));
    }
  }

  .photo-overlay,
  .photo-placeholder {
    height: 100%;
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    justify-content: flex-end;

    .photo-info {
      color: #ffffff;
      padding: 20px;
    }
  }

  .photo-overlay {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .photo-placeholder {
    background-color: #f5f5f5;

    @keyframes placeHolderShimmer {
      0% {
        background-position: -400px 0;
      }
      100% {
        background-position: 400px 0;
      }
    }

    &-text {
      height: 15px;
      margin-bottom: 8px;
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeHolderShimmer;
      animation-timing-function: linear;
      background: #e6e6e6 linear-gradient(to right, #efefef 8%, #dfdfdf 18%, #efefef 33%);
      background-size: 800px 104px;
    }

    .photo-info-title {
      width: 180px;
    }

    .photo-info-subtitle {
      width: 100px;
    }
  }
}
</style>
