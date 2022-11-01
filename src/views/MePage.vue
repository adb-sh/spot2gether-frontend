<script setup lang="ts">
import PromiseResolver from "@/components/PromiseResolver.vue";
import CurrentlyPlayingCompact from "@/components/CurrentlyPlayingCompact.vue";
import { onBeforeUnmount, ref } from "vue";
import { useApi } from "@/Api";

const api = useApi();

const userInfo = ref(api?.getCurrentlyPlaying());

let refreshUserInfo = setInterval(() => {
  userInfo.value = api?.getCurrentlyPlaying();
}, 10000);

onBeforeUnmount(() => {
  clearInterval(refreshUserInfo);
});
</script>

<template>
  <div>
    <h1>Me</h1>
    <h2>Currently Listening to</h2>
    <PromiseResolver
      :promise="userInfo"
      v-slot="{ data: { currentlyPlaying } }"
    >
      <CurrentlyPlayingCompact v-if="currentlyPlaying?.item" :currentlyPlaying="currentlyPlaying" />
      <div v-else class="alert alert-info">
        You are not listening to music.
      </div>
    </PromiseResolver>
    <h2>Session</h2>
    <PromiseResolver
      :promise="$api.getSession()"
    >
      <template #default="{ data: { session }, update }">
        <div class="card">
          <div class="card-header">
            Your session
          </div>
          <div class="card-body">
            <b>Host</b>
            <div>
              {{ session.host?.spotify.userId }}
            </div>
            <b>Clients</b>
            <div>
              <div v-for="client in session.clients" :key="client">
                {{ client.displayName }}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button
              class="btn btn-danger mx-1"
              @click="$api.leaveSession().then(() => update($api.getSession()))"
            >
              leave Session
            </button>
            <button
              class="btn btn-danger mx-1"
              @click="$api.deleteSession().then(() => update($api.getSession()))"
            >
              delete Session
            </button>
          </div>
        </div>
      </template>
      <template #error="{ error, update }">
        <div v-if="error.response.status === 404">
          <div class="alert alert-info">
            You are not part of a session.
          </div>
          <button
            @click="$api.createSession().then(() => update($api.getSession()))"
            class="btn btn-success"
          >
            Create Session
          </button>
        </div>
      </template>
    </PromiseResolver>
  </div>
</template>

<style scoped lang="scss"></style>
