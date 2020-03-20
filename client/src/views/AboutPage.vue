<template>
  <div class="contentLeft">
    <div class="description">
        <div class="about_title">关于我</div>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>

        <div class="about_title">关于博客</div>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
        <p>dsadasdasdasda</p>
    </div>
    <BlogComments bid="-1" />
    <Sendcomment bid="-1" />
  </div>
</template>

<script>
import BlogComments from '@/components/BlogComments'
import Sendcomment from '@/components/Sendcomment'
import '../assets/css/about.css'
export default {
  mounted(){
    console.log(1);
    
  },
  components: {
    BlogComments,
    Sendcomment
  }
}
</script>

<style>

</style>