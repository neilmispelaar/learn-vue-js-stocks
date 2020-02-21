<template>
  <div id="app" class="antialiased">
    <Header></Header>
    <div class="container w-3/5 mx-auto px-6">
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style>

</style>
