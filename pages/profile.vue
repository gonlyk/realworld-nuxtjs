import { getArticles, getArticlesFeed, getProfile } from "../api"

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <!-- <img :src="profile.image" class="user-img" /> -->
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ `${ profile.following ? 'unFollow' : 'Follow' } ${profile.username}` }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{ active: tab === 'My_Articles' }"
                  exact
                  :to="{
                    name: 'Profile',
                    params: {
                      username: username
                    },
                    query: {
                      tab: 'My_Article'
                    }
                  }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" 
                  exact
                  :class="{ active: tab === 'Favorite_Article' }"
                  :to="{
                    name: 'Profile',
                    params: {
                      username: username
                    },
                    query: {
                      tab: 'Favorite_Article'
                    }
                  }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="(article, index) in articles"
            :key="index"
            class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{
                  name: 'Profile',
                  param: {
                    username: article.author.username
                  }
              }"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                  name: 'Profile',
                  param: {
                    username: article.author.username
                  }
                }" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="favorite(article)">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
                name: 'Article',
                params: {slug: article.slug}
              }" class="preview-link">
              <h1>
                {{ article.author.bio }}
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile,
         getArticles,
         getArticlesFeed,
         favoriteArticle,
         unfavoriteArticle } from '../api';

export default {
  middleware: 'authenticated',
  async asyncData({ params, query, store }) {
    let username = params.username || '';
    let tab = query.tab || 'My_Articles'

    // let loginUser = store.state.user && store.state.user.username || '';
    // console.log(loginUser)

    let loadArticle = () => tab === 'My_Articles' 
                            ? getArticles({ author: username })
                            : getArticlesFeed({ favorited: username });
    
    let [ articleRes, profileRes ] = await Promise.all([
      loadArticle(),
      getProfile(username)
    ])
    let { data: profile } = profileRes;
    let { data: articles, articlesCount = 0 } = articleRes;
    
    profile = profile.profile || {};
    articles = articles.articles || {};
    let page = query.page || 1;
    let limit = 20;
    let pageCount = Math.floor(articlesCount / limit) || 1;

    return {
      tab,
      profile,
      articles,
      page,
      limit,
      pageCount,
      username
    };
  },
  watchQuery: ['tab'],
  mounted() {
    console.log('article', this.articles)
  },
  methods: {
    async favorite(article) {
      let { retCode } = await (article.favorited 
                      ? unfavoriteArticle(article.slug)
                      : favoriteArticle(article.slug));
      if(retCode === 0) {
        article.favorited = !article.favorited;
        article.favoritesCount += article.favorited ? 1 : -1;
      }
    }
  }
};
</script>

<style>
</style>