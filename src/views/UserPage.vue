<script setup lang="ts">
import PromiseResolver from "@/components/PromiseResolver.vue";
import CurrentlyPlaying from "@/components/CurrentlyPlaying.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <h1>User</h1>
  <PromiseResolver
    :promise="$api.getUserInfo($route.params.id)"
    v-slot="{ data: { user, currentlyPlaying } }"
    class="row"
  >
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          {{ user.displayName }}
        </div>
        <div class="card-body">
          <img :src="user.images[0].url" alt="user image" class="card-img">
        </div>
      </div>
      <button
        v-if="$api.isAuthorized()"
        @click="$api.joinSession($route.params.id)"
        class="btn btn-primary my-2"
      >
        Join Session
      </button>
      <router-link
        v-else
        to="/auth"
        class="btn btn-primary my-2"
      >
        login with Spotify and join session
      </router-link>
    </div>
    <div class="col">
      <h2>Currently listening to:</h2>
      <CurrentlyPlaying v-if="currentlyPlaying?.item" :currently-playing="currentlyPlaying" />
    </div>
  </PromiseResolver>
</template>
