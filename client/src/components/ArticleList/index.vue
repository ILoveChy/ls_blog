<template>
  <div id="article_list" class="article_list">
                <h1>最新文章</h1>
                <div class="article" :key="article.link" v-for="article in articleList">
                    <div class="article_img"></div>
                    <div class="article_msg">
                        <p class="article_title">
                            <a :href="article.link">
                                {{article.title}}
                            </a>
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
        fromNow: date => {
            var dur = new Date - new Date(date * 1000);
            return (
                dur < 10 * 1000 && '刚刚' ||
                dur < 60 * 1000 && '不到一分钟' ||
                dur < 30 * 60 * 1000 && '半小时前' ||
                dur < 60 * 60 * 1000 && '一小时前' ||
                dur < 12 * 60 * 60 * 1000 && '半天之内' ||
                dur < 24 * 60 * 60 * 1000 && '一天之内' ||
                dur < 3 * 12 * 60 * 60 * 1000 && '三天之内' ||
                dur < 7 * 12 * 60 * 60 * 1000 && '一周之内' ||
                dur < 30 * 12 * 60 * 60 * 1000 && '一个月之内' ||
                dur < 6 * 30 * 12 * 60 * 60 * 1000 && '半年之内' ||
                dur < 12 * 30 * 12 * 60 * 60 * 1000 && '快一年了' || '很久远了'
            )
        },
        setThisPageNumList:(result)=>{
            this.pageNumList.push(...result)           
        }
    },
    computed: {
        getPage() {
            return (page, pageSize) => {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searchUrlParams[i].split("=")[1];
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                if (tag == "") { //非查询
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
                                temp['date'] = this.fromNow(result[key].ctime);
                                temp['link'] = "/blog_detail.html?bid=" + result[key].id;
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
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(res => {
                        var result = res.data.data;
                        var list = [];
                        for (const key in result) {
                            if (!Object.prototype.hasOwnProperty.call(result, "key")) {
                                var temp = {};
                                temp.title = result[key].title;
                                temp.tags = result[key].tags;
                                temp.id = result[key].id;
                                temp.visit = result[key].views;
                                temp.content = result[key].content;
                                temp.date = this.fromNow(result[key].ctime);
                                temp.link = "/blog_detail.html?bid=" + result[key].id;
                                list.push(temp);
                            }
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(err => {
                        console.log(err);
                    })

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
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