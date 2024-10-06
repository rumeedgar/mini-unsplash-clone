<template>
  <div class="previewer">
    <div class="previewer-close">
      <a href="" @click.prevent="closePreview">
        <img class="previewer-close-icon" src="@/assets/close-icon.svg" alt="Close" />
      </a>
    </div>

    <div class="previewer-content">
      <div
        class="previewer-image"
        :style="'background-image: url(' + preview.urls.regular + ')'"
      ></div>
      <div class="previewer-info">
        <div class="previewer-title">{{ preview.user.name }}</div>
        <div class="previewer-subtitle">{{ preview.user.location }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'ImagePreview',
  props: {
    preview: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    const closePreview = () => {
      document.body.style.overflow = 'visible'
      emit('close')
    }

    onBeforeUnmount(() => {
      document.body.style.overflow = 'visible'
    })

    return { closePreview }
  }
}
</script>

<style lang="scss" scoped>
.previewer {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 100vh;
  position: fixed;
  overflow: auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .previewer-close {
    position: absolute;
    top: 20px;
    right: 20px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .previewer-close-icon {
      width: 24px;
      height: 24px;
      opacity: 0.7;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  .previewer-content {
    max-width: 90%;
    width: 800px;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .previewer-image {
      width: 100%;
      height: 0;
      padding-bottom: 66.67%; // 3:2 aspect ratio
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .previewer-info {
      padding: 20px;

      .previewer-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 4px;
        color: var(--primary-color);
      }

      .previewer-subtitle {
        font-size: 14px;
        color: var(--secondary-color);
      }
    }
  }
}

@media (max-width: 600px) {
  .previewer {
    padding: 10px;

    .previewer-content {
      max-width: 100%;

      .previewer-image {
        padding-bottom: 75%; // 4:3 aspect ratio for smaller screens
      }

      .previewer-info {
        padding: 15px;

        .previewer-title {
          font-size: 16px;
        }

        .previewer-subtitle {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
