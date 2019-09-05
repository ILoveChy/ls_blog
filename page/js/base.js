var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: ["asd", "asdasd", "sadwqeqwx", "edqweqeqw", "qweqweqweqwsdca2", "sad", "asd", "asdasd", "三大阿斯顿", "edqweqeqw", "大声道无群二无群错所", "sad"]
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

    },
})
var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [{
            title: "百度",
            link: "https://www.baidu.com"
        }, {
            title: "新浪",
            link: "https://www.sina.com.cn"
        }, {
            title: "婉月歌GitHub",
            link: "https://github.com/ILoveChy"
        }, {
            title: "这是一个链接",
            link: "https://www.baidu.com"
        }, {
            title: "这是一个链接",
            link: "https://www.baidu.com"
        }, {
            title: "这是一个链接",
            link: "https://www.baidu.com"
        }, {
            title: "这是一个链接",
            link: "https://www.baidu.com"
        }, {
            title: "这是一个链接",
            link: "https://www.baidu.com"
        }, {
            title: "这是一个链接",
            link: "https://www.baidu.com"
        }]
    },
    computed: {

    },
    created() {

    }
})

var newComments = new Vue({
    el: "#newComments",
    data: {
        commentList: [{
            username: "喵怼怼",
            date: "2019-09-02",
            comment: "巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅"
        }, {
            username: "怼喵喵",
            date: "2019-09-02",
            comment: "巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅"
        }, {
            username: "怼怼喵",
            date: "2019-09-02",
            comment: "巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅"
        }, {
            username: "汪汪",
            date: "2019-09-02",
            comment: "巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅"
        }, {
            username: "汪汪汪",
            date: "2019-09-02",
            comment: "巴拉巴拉巴拉纳撒打算打算打算打算的撒打算带我去额额外企鹅"
        }]
    },
    computed: {

    },
    created() {

    }
})