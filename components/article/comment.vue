<template>
  <div class=''>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentText"
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          :src="user.image"
          class="comment-author-img"
        />
        <button class="btn btn-sm btn-primary"
          @click="postComment">Post Comment</button>
      </div>
    </form>

    <div class="card"
      v-for="comment in comments"
      :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author"
        :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment,
         addComment } from '../../api';
import { mapState } from 'vuex';
export default {
  props:{
    article: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      comments: [],
      commentText: ''
    };
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async postComment() {
      const params = {
        comment: {
          body: this.commentText
        }
      }
      const { retCode, data } = await addComment(this.article.slug, params);
      if(retCode === 0) {
        const { comment } = data;
        this.comments.push(comment);
      }

    }
  },
  created() {

  },
  async mounted() {
    const { data, retCode } = await getComment(this.article.slug);
    if(retCode === 0) {
      this.comments = data.comments;
      console.log(this.comments)
    }
  },
  beforeCreate() {},
  beforeMount() {}
}
</script>
<style lang='scss' scoped>

</style>