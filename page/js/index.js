var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: 'asaasdasdasd'
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(res => {
            everyDay.content = res.data.data[0].content
        }).catch(err => {
            console.log(err, "请求失败");
        })
    },
})

var articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
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
                            if (result.hasOwnProperty(key)) {
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
                        articleList.articleList = list;
                        this.page = page;
                    }).catch(err => {
                        console.log(err, "请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(res => {
                        articleList.count = res.data.data[0].count;
                        this.generatePageTool;
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
                            if (result.hasOwnProperty(key)) {
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
                        articleList.articleList = list;
                        this.page = page;
                    }).catch(err => {
                        console.log(err);
                    })

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(res => {
                        articleList.count = res.data.data[0].count;
                        this.generatePageTool;
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
        },
        generatePageTool() {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({
                text: "<<",
                page: 1
            });
            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                })
            }
            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                })
            }
            result.push({
                text: nowPage,
                page: nowPage
            })
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                })
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                })
            }
            result.push({
                text: ">>",
                page: parseInt((totalCount + pageSize - 1) / pageSize)
            })
            this.pageNumList = result;
            return result;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
    }
})