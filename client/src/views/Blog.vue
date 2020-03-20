<template>
   <div class="contentLeft">
            <div id="blog_detail" class="blog">
                <div class="blog_title">{{title}}</div>
                <div class="blog_msg">作者:喵怼怼 标签:{{tags}} 发布于:{{ctime}} 浏览({{visit}})</div>
                <div class="blog_content" v-html="content"></div>
            </div>
            <BlogComments bid='-10' />
            <SendComment bid='-1' />
        </div>
</template>

<script>
import axios from 'axios'
import fromNow from '../util/fromNow'
import BlogComments from '@/components/BlogComments'
import SendComment from '@/components/Sendcomment'
import '../assets/css/blog_detail.css'
export default {
    data(){
        return{
           title: "",
           content: "",
           ctime: "",
           tags: "",
           visit: ""
        }
    },
    created() {
        var bid = -1;
        bid=parseInt(this.$route.params.bid)
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(res => {
          console.log(res);
          
            var result = res.data.data[0];
            this.title = result.title;
            this.content = result.content;
            this.ctime = fromNow(result.ctime);
            this.tags = result.tags;
            this.visit = result.views;
        }).catch(err => {
            console.log(err, "请求失败");
        });
    },
    components:{
      SendComment,
      BlogComments
    }
}
</script>

<style>

</style>