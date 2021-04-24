<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                :class="{ active: tab === 'Your_Feed' }"
                exact
                :to="{
                  name: 'Home',
                  query: {
                    tab: 'Your_Feed',
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{ active: tab === 'Global_Feed' }"
                  exact
                  :to="{
                    name: 'Home',
                    query: {},
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div v-for="article in articles"
            :key="article.slug"
            class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'Profile',
                params: {
                  username: article.author.username
                }
              }">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{
                  name: 'Profile',
                  params: {
                    username: article.author.username
                  }
                }">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="favorite(article)">
                <i class="ion-heart"></i> {{ article.favoritesCount || 0 }}
              </button>
            </div>
            <nuxt-link class="preview-link"
              :to="{
                name: 'Article',
                params: {slug: article.slug}
              }">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page
              }"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'Home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }"
              >{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="(tag, index) in tags"
                :key="index"
                :to="{
                  name: 'Home',
                  query: {
                    tab: 'Tag_Feed',
                    tag
                  }
                }"
                class="tag-pill tag-default">{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles,
         getArticlesFeed,
         getTags,
         favoriteArticle,
         unfavoriteArticle } from "../api";

export default {
  name: "Home",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 10;
    const tab = query.tab || "Global_Feed";
    const tag = query.tag;

    const loadArticles = tab === "Global_Feed" ? getArticles : getArticlesFeed;

    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    return {
      articles,
      articlesCount,
      tags,
      page,
      limit,
      tab,
      tags
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    totalPage () {
        return Math.ceil(this.articlesCount / this.limit) || 1;
    }
  },
  mounted() {
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