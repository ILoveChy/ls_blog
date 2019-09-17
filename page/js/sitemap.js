var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {

    },
    created() {
        axios({
            method: "get",
            url: "/queryAllBlog",
        }).then(res => {
            for (let i = 0; i < res.data.data.length; i++) {
                res.data.data[i].link = "/blog_detail.html?bid=" + res.data.data[i].id;
            }
            this.blogList = res.data.data;
        })
    },
})