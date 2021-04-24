<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="create"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle,
         updateArticle } from '../api';

export default {
  middleware: 'authenticated',
  data() {
    return {
      title: '',
      description: '',
      body: '',
      tags: ''
    }
  },
  computed: {
  },
  methods: {
    async create() {
      const { title, description, body, tags } = this;
      const param = {
        article: {
          title,
          description, 
          body, 
          tagList: tags.trim().split(' ')
        }
      };
      let { data, retCode } = await createArticle(param);
      if(retCode === 0) {
        this.$router.push({ name: 'Home' })
      }
    },
  }
};
</script>

<style>
</style>