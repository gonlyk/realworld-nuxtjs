<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta @followChange="followChange" 
          @favoriteChange="favoriteChange"
          :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>

      <hr />

      <div class="article-actions">
        <article-meta @followChange="followChange"
          @favoriteChange="favoriteChange"
         :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article"></article-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle,
         createArticle } from '../api';

import markdownIt from 'markdown-it';

import ArticleComment from '../components/article/comment';
import ArticleMeta from '../components/article/meta';
export default {
  name: 'Article',
  async asyncData({ route }) {
    const { data } = await getArticle(route.params.slug);
    const { article } = data;
    let md = new markdownIt();
    article.body = md.render(article.body || '');
    return {
      article
    }
  },
  methods: {
    followChange(follow) {
      this.article.author.following = follow;
    },
    favoriteChange(favorite) {
      this.article.favorited = favorite;
      this.article.favoritesCount += favorite ? 1 : -1;
    }
  },
  mounted() {
    console.log(this.article)
  },
  components: {
    ArticleComment,
    ArticleMeta
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  }
};
</script>

<style>
</style>