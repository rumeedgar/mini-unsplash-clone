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
            <div class="photo-info-name">{{ photo.user.name }}</div>
            <small class="photo-info-location">{{ photo.user.location }}</small>
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
    position: relative;
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

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

    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
      position: relative;
      z-index: 2;
    }
  }

  .photo-overlay {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
    transition: background 0.3s ease;

    &:hover {
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
    }
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
      animation: placeHolderShimmer 1.5s infinite linear;
      background: linear-gradient(to right, #efefef 8%, #dfdfdf 18%, #efefef 33%);
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

.photo-info-name,
.photo-info-location {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .photo-info-name,
  .photo-info-location {
    opacity: 0;
    transform: translateY(5px);
  }

  .photo-overlay:hover {
    .photo-info-name,
    .photo-info-location {
      opacity: 1;
      transform: translateY(0);
    }

    .photo-info-name {
      transition-delay: 0.1s;
    }

    .photo-info-location {
      transition-delay: 0.2s;
    }
  }
}
</style>
