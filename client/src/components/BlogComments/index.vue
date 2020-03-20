<template>
      <div class="blog_comments" id="blog_comments">
                <span class="blog_comments_msg">当前文章:目前有{{total}}条留言</span>
                <div class="blog_comment" :key="comment.user_name" v-for="comment in comments">
                    <span>
                        <b>{{comment.user_name}}</b>:{{comment.options}}发表于 {{comment.ctime}}
                        <a style="cursor: pointer" @click="reply(comment.id,comment.user_name)">[回复]</a>
                    </span>
                    <div>
                        {{comment.comments}}
                    </div>
                </div>
            </div>
</template>

<script>
import axios from 'axios'
import fromNow from '@/util/fromNow.js'
export default {
  props:['bid'],
  data(){
       return{
        total: 0,
        comments: []
       }      
    },
    computed: {
        reply() {
            return (commentId, userName) => {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created() {
        var bid = this.bid
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(res => {
            this.comments = res.data.data;
            for (let i = 0; i < this.comments.length; i++) {
                this.comments[i].ctime = fromNow(this.comments[i].ctime);
                if (this.comments[i].parent > -1) {
                    this.comments[i].options = "回复@" + this.comments[i].parent_name
                }

            }
        });
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + bid
        }).then(res => {
            this.total = res.data.data[0].count;
        }).catch(err => {
            console.log(err, "请求错误");
        })
    },
}
</script>

<style>

</style>