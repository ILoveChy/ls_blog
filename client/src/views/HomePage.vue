<template>
      <div class="contentLeft">
        <EveryDay />
        <ArticleList />
      </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import EveryDay from '@/components/EveryDay'
export default {
  components: {
    ArticleList,
    EveryDay,
  }
}
</script>

<style>

</style>