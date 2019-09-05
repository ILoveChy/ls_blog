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
        articleList: [{
            img: "",
            title: "这个是标题",
            content: "这个是内容",
            date: "这个是时间 2019-09-02",
            visit: "这个是访问量 9999",
            tags: "这个是标签 Vue Css",
            id: "1",
            link: ""
        }, {
            title: "这个是标题",
            content: "这个是内容",
            date: "这个是时间 2019-09-02",
            visit: "这个是访问量 9999",
            tags: "这个是标签 Vue Css",
            id: "2",
            link: ""
        }, {
            title: "这个是标题",
            content: "这个是内容",
            date: "这个是时间 2019-09-02",
            visit: "这个是访问量 9999",
            tags: "这个是标签 Vue Css",
            id: "3",
            link: ""
        }, {
            title: "这个是标题",
            content: "这个是内容",
            date: "这个是时间 2019-09-02",
            visit: "这个是访问量 9999",
            tags: "这个是标签 Vue Css",
            id: "4",
            link: ""
        }]
    },
    computed: {

    },
    created() {

    }
})