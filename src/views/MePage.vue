<script setup lang="ts"></script>

<template>
  <div>
    <h1>Me</h1>
    <PromiseResolver
      :promise="$api.getSession()"
      v-slot="slot"
    >
      <div class="card">
        <div class="card-header">
          Your session
        </div>
        <div class="card-body">
          <p>
            {{ slot }}
          </p>
          <b>Clients</b>
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
    </PromiseResolver>
  </div>
</template>

<style scoped lang="scss"></style>
