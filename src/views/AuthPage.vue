<script setup>
import querystring from "querystring";

const randomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for ( let i = 0; i < length; i++ )
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}

const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
  response_type: 'code',
  // eslint-disable-next-line
  client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
  // eslint-disable-next-line
  redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URI,
  scope: 'user-read-email app-remote-control user-read-playback-state user-read-currently-playing user-modify-playback-state',
  state: randomString(16),
});
</script>

<template>
  <div>
    <h1>Login</h1>
    <div class="card">
      <div class="card-header">
        Authenticate with Spotify
      </div>
      <div class="card-body">
        <a class="btn btn-primary" :href="authUrl">Authenticate</a>
      </div>
    </div>
  </div>
</template>
