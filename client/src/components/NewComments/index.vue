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
import fromNow from '@/util/fromNow.js'
export default {
    data(){
        return{
          commentList: []
        }
    },
    created() {
      
        axios({
            method: "get",
            url: '/queryNewComments'
        }).then(res => {
            var result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                var temp = {};
                temp.username = res.data.data[i].user_name;
                // console.log(fromNow());
                
                temp.date = fromNow(res.data.data[i].ctime);
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