var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize() {
            return function () {
                var size = Math.random() * 20 + 12 + 'px';
                return size
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(res => {
            var result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                result.push({
                    text: res.data.data[i].tag,
                    link: "/?tag=" + res.data.data[i].tag
                });
            }
            this.tags = result;
        })
    },
})
var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    computed: {

    },
    created() {
        axios({
            method: "get",
            url: '/queryHotBlog'
        }).then(res => {
            var result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                var temp = {};
                temp.title = res.data.data[i].title;
                temp.link = '/blog_detail.html?bid=' + res.data.data[i].id;
                result.push(temp);
            }
            this.titleList = result;
        })
    }
})

var newComments = new Vue({
    el: "#newComments",
    data: {
        commentList: []
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
    created() {
        axios({
            method: "get",
            url: '/queryNewComments'
        }).then(res => {
            console.log(res);

            var result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                var temp = {};
                temp.username = res.data.data[i].user_name;
                temp.date = this.fromNow(res.data.data[i].ctime);
                temp.comment = res.data.data[i].comments;
                result.push(temp);
            }
            this.commentList = result;
        })
    }
})