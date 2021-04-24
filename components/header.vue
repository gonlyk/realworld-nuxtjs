<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link active"
            :to="{ 
              name: 'Home'
            }">Home</nuxt-link>
        </li>
        <template v-if="user">
          <li class="nav-item">
            <nuxt-link class="nav-link"
              :to="{
                name: 'Editor'
              }"><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
              :to="{
                name: 'Setting'
              }">&nbsp;Settings</nuxt-link>
          </li>
          <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/profile/${user.username}`">
                <img
                  class="user-pic"
                  :src="user.image"
                >
                {{ user.username }}
              </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link"
              :to="{
                name: 'Login'
              }">Sign in</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
              :to="{
                name: 'Register'
              }">Sign up</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'headerComponent',
    computed: {
      ...mapState(['user'])
    },
};
</script>

<style>
</style>