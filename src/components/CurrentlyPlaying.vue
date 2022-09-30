<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  currentlyPlaying: Object,
});
</script>

<template>
  <div class="currentlyPlaying card">
    <div class="card-header">
      <b>{{ currentlyPlaying.item.name }}</b>
      {{ currentlyPlaying.item.artists.map(artist => artist.name).join(', ') }}
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md">
          <img :src="currentlyPlaying.item.album.images[0].url" alt="album cover" class="card-img">
          <p>
            listening from {{ currentlyPlaying.context.type }}
          </p>
        </div>
        <div class="col-md">
          <p class="my-2">
            <a
              :href="currentlyPlaying.item.externalURL.spotify"
              target="_blank"
              rel="noopener norefferrer"
              class="btn btn-outline-dark m-1"
            >
              view track on Spotify
            </a>
            <a
              :href="currentlyPlaying.context.externalURL.spotify"
              target="_blank"
              rel="noopener norefferrer"
              class="btn btn-outline-dark m-1"
            >
              view playlist on Spotify
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.currentlyPlaying {
  .card-img {
    max-width: 20rem;
  }
}
</style>
