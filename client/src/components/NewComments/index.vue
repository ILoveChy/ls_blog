<template>
              <div id="newComments" class="right_module">
                <div>最新评论</div>
                <ul>
                    <li :key="commentItem.data" v-for="commentItem in commentList">
                        <div>
                            <span>{{commentItem.username}}</span>
                            <span class="pull_right">{{commentItem.date}}</span>
                        </div>
                        <p>{{commentItem.comment}}</p>
                    </li>
                </ul>
            </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
          commentList: []
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
        }
    },
    created() {
      
        axios({
            method: "get",
            url: '/queryNewComments'
        }).then(res => {
            console.log(res,1111);

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
}
</script>

<style>

</style>