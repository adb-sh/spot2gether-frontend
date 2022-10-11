<template>
  <div>
    <div class="bg-secondary shadow">
      <nav class="navbar px-2 container">
        <router-link class="d-flex btn" to="/">
          <div class="d-flex header-title flex-column justify-content-center">
            <b>spot2gether</b>
            <div>music connects</div>
          </div>
        </router-link>
        <div>
          <router-link
            v-if="!$api.isAuthorized()"
            to="/auth"
            class="btn btn-outline-dark"
          >
            login
          </router-link>
        </div>
      </nav>
    </div>
    <div class="container my-5">
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@import "main.scss";

nav {
  a {
    font-weight: bold;

    &.router-link-exact-active {
      text-decoration: underline;
    }
  }
}
</style>
