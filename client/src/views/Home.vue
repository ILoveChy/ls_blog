<template>
  <div class="home">
    <div class="zw">
      <div class="title">怼喵喵的博客</div>
      <div class="subtitle">做一个佛系的技术男，发际线就是底线</div>
    </div>
    <Header />
    <div class="content">
      <router-view />
      <div class="contentRight">
        <RandomTags />
        <NewHot />
        <NewComments />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import RandomTags from '@/components/RandomTags'
import NewHot from '@/components/NewHot'
import NewComments from '@/components/NewComments'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../assets/css/home.css'
import '../assets/css/index.css'

export default {
  components: {
    Header,
    Footer,
    RandomTags,
    NewHot,
    NewComments
  }
}
</script>
