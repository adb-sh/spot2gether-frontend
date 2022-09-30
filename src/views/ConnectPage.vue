<script setup lang="ts">
import PromiseResolver from "@/components/PromiseResolver.vue";
import CurrentlyPlaying from "@/components/CurrentlyPlaying.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="about">
    <h1>Connect</h1>
    <div class="card">
      <div class="card-header">
        test
      </div>
      <div class="card-body">
        <PromiseResolver
          :promise="$api.testConnection()"
          v-slot="{ data }"
        >
          {{ data }}
        </PromiseResolver>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        role
      </div>
      <div class="card-body">
        <PromiseResolver
          :promise="$api.getRole()"
          v-slot="{ data }"
        >
          {{ data }}
        </PromiseResolver>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        currently playing
      </div>
      <div class="card-body">
        <PromiseResolver
          :promise="$api.getCurrentlyPlaying()"
          v-slot="{ data: { currentlyPlaying }, update }"
          class="col-md-4"
        >
          <CurrentlyPlaying :currently-playing="currentlyPlaying" />
          <button @click="update($api.getCurrentlyPlaying())" class="btn btn-secondary">update</button>
        </PromiseResolver>
      </div>
    </div>
  </div>
</template>
