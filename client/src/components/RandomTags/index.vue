<template>
    <div id="random_tags" class="right_module">
        <div>随机标签云</div>
        <router-link
          :to="{path:tag.link}"
          :key="tag.link" 
          v-for="tag in tags" 
          :style="{color:randomColor(),fontSize:randomSize()}"
        >
            {{tag.text }}
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
      return{
        tags: []
      }
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
}
</script>

<style>

</style>