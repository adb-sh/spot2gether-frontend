<script setup lang="ts">
import PromiseResolver from "@/components/PromiseResolver.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    <h1>Connect to Spotify</h1>
    <div class="card">
      <div class="card-body">
        <PromiseResolver :promise="$api.auth({
          code: route.query.code,
          state: route.query.state,
        })">
          {{ $route.query }}
          <div class="alert alert-success">
            Authorization completed
          </div>
          <router-link to="/connect" class="btn btn-primary">
            Join a Session
          </router-link>
        </PromiseResolver>
      </div>
    </div>
  </div>
</template>
