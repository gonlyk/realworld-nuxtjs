<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in error">
              <li v-for="(message) in messages"
                :key="message + field">
                {{ message }} {{ field }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../api";
// 这里为什么不能用import
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      username: "",
      email: "",
      password: "",

      error: {},
    };
  },
  methods: {
    async onSubmit() {
      const params = {
        user: {
          username: this.isLogin ? undefined : this.username,
          email: this.email,
          password: this.password,
        },
      };
      const { data, retCode } = this.isLogin
        ? await login(params)
        : await register(params);
      if (retCode === 0) {
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);

        this.$router.push("/");
      } else {
        this.error = data.errors;
      }
    },
  },
  computed: {
    isLogin() {
      return this.$route.name === "Login";
    },
  },
};
</script>

<style>
</style>