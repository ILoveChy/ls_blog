<template>
  <div id="article_list" class="article_list">
                <h1>最新文章</h1>
                <div class="article" :key="article.link" v-for="article in articleList">
                    <div class="article_img"></div>
                    <div class="article_msg">
                        <p class="article_title">
                            <router-link :to="{path:'blog/'+article.id}">{{article.title}}</router-link>
                        </p>
                        <p class="article_content">
                            {{article.content}}
                        </p>
                    </div>
                    <div class="article_foot">发布于{{article.date}} | 浏览({{article.visit}}) | Tags：{{article.tags}}</div>
                </div>
  </div>
</template>

<script>
import fromNow from '@/util/fromNow.js'
import axios from 'axios'
export default {
    data(){
      return{
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
      }
    },
    methods: {
        setThisPageNumList:(result)=>{
            this.pageNumList.push(...result)                 
        }
    },
    computed: {
        getPage() {
            return (page, pageSize) => {
                console.log(this.$route.query.tag);
                console.log(this.page);
                
                if (this.$route.query.tag == undefined) { //非查询
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(res => {
                        var result = res.data.data;
                        var list = [];
                        for (const key in result) {
                            if (!Object.prototype.hasOwnProperty.call(result, "key")) {
                              
                                var temp = {};
                                temp['title'] = result[key].title;
                                temp['tags'] = result[key].tags;
                                temp['id'] = result[key].id;
                                temp['visit'] = result[key].views;
                                temp['content'] = result[key].content;
                                temp['date'] = fromNow(result[key].ctime);
                                temp['link'] = "/blog/"+result[key].id;
                                list.push(temp);
                            }
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(err => {
                        console.log(err, "请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(res => {                        
                        this.count = res.data.data[0].count;
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + this.$route.query.tag
                    }).then(res => {
                      
                      
                        console.log(res);
                        var result = res.data.data;
                        var list = [];
                        for (const key in result) {
                          var temp = {};
                          temp.title = result[key].title;
                          temp.tags = result[key].tags;
                          temp.id = result[key].id;
                          temp.visit = result[key].views;
                          temp.content = result[key].content;
                          temp.date = fromNow(result[key].ctime);
                          temp.link = "/blog/" + result[key].id;
                          list.push(temp);
                        }                        
                        this.articleList = list;
                        this.page = page;
                    }).catch(err => {
                        console.log(err);
                    })

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + this.$route.query.tag
                    }).then(res => {
                        this.count = res.data.data[0].count;
                    }).catch(err => {
                        console.log(err);
                    })
                }

            }
        },
        jumpTo() {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        }
    },
    mounted() {
        this.getPage(this.page, this.pageSize);
    }
}
</script>

<style>

</style>