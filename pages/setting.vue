<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" 
                    v-model="image"
                    type="text" 
                    placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" 
                    v-model="username"
                    type="text" 
                    placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg"
                    v-model="bio"
                    rows="8" 
                    placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" 
                    v-model="email"
                    type="text" 
                    placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" 
                    v-model="password"
                    type="password" 
                    placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '../api';

export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      image: '',
      bio: ''
    }
  },
  methods: {
    async update() {
      const {email,
             username,
             password,
             image,
             bio } = this;
      const param = {
        user: {
          email,
          username,
          password,
          image,
          bio
        }
      }

      let { data, retCode } = await updateUser(param);
      if(retCode === 0) {
        this.$router.push({name: 'Home'})
      }
    }
  }
}
</script>

<style>

</style>
