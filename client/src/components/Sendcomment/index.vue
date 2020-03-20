<template>
    <div id="send_comment" class="send_comment">
                <span>发表评论</span>
                <div>
                    <input type="hidden" id="comment_reply" value="-1">
                    <input type="hidden" id="comment_reply_name" value="0">
                    <input type="text" placeholder="昵称" id="comment_name">
                    <input type="text" placeholder="邮箱(评论被回复时你能收到通知)" id="comment_email">
                </div>
                <div>
                    <textarea placeholder="无意义的内容有可能不会回复你" id="comment_content"></textarea>
                </div>
                <div>
                    <input type="text" placeholder="验证码" id="comment_code">
                    <span v-html="vcode" @click="changeCode()"></span>
                </div>
                <button @click="sendComment()">提交评论</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['bid'],
    data(){
      return{
        vcode: "",
        rightCode: ""
      }
    },
    computed: {
        changeCode() {
            return () => {
                axios({
                    method: "get",
                    url: '/queryRandomCode'
                }).then(res => {
                    this.vcode = res.data.data.data;
                    this.rightCode = res.data.data.text;
                })
            }
        },
        sendComment() {
            return () => {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return;
                }
                var bid = this.bid
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1])
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var commentCode = document.getElementById("comment_code").value;
                if (commentCode !== this.rightCode) {
                    alert("验证码错误");
                    return;
                }
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&comments=" + content + "&parentName=" + replyName,
                }).then(res => {
                    alert(`提交${res.data.status}`);
                })
            }
        }
    },
    created() {
        this.changeCode();
    },
}
</script>

<style>

</style>