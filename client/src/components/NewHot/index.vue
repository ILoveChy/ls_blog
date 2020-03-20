<template>
    <div id="new_hot" class="right_module">
        <div>最近热门</div>
        <ul>
            <li :key="titleItem.link" v-for="titleItem in titleList">
              <router-link :to="{path:titleItem.path}">{{titleItem.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
          titleList: []
        }
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
                temp.id = res.data.data[i].id;
                temp.path=`/blog/${temp.id}`
                result.push(temp);
            }
            this.titleList = result;
        })
    }
}
</script>