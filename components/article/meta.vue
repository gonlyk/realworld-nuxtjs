<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'Profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'Profile',
        params: {
          username: article.author.username
        }
      }" class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      @click="follow">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
      @click="favorite">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { followUser,
         unFollowUser,
         favoriteArticle,
         unfavoriteArticle } from '../../api';

export default {
  props: {
    article: {
      require: true
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {
    async follow() {
      let { data, retCode } = this.article.author.following 
                            ? await unFollowUser(this.article.author.username)
                            : await followUser(this.article.author.username);
      if(retCode === 0) {
        this.$emit('followChange', data.profile.following);
      }
    },
    async favorite() {
      let { data, retCode } = this.article.favorited
                            ? await unfavoriteArticle(this.article.slug)
                            : await favoriteArticle(this.article.slug);
                    
      if(retCode === 0) {
        this.$emit('favoriteChange', data.article.favorited);
      }
    }
  },
  created() {

  },
  mounted() {

  },
  beforeCreate() {},
  beforeMount() {}
}
</script>
<style lang='scss' scoped>

</style>