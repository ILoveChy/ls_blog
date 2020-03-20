<template>
  <div class="contentLeft">
            <div class="description">
                <p>欢迎灌水交流，别看我长时间不发博，博主可一直都在线~</p>
                <p style="color: red">友链只交换技术类个人博客。</p>
                <p style="color: red">不要皮，谢谢。</p>
                <p style="color: red">博主联系:MzcxNjA0Nzg1</p>
            </div>
           <BlogComments bid="-2" />
           <Sendcomment bid="-2" />
    </div>
</template>

<script>
import BlogComments from '@/components/BlogComments'
import Sendcomment from '@/components/Sendcomment'
export default {
    components: {
    BlogComments,
    Sendcomment
  }
}
</script>

<style>

</style>