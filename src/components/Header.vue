<template>
  <header>
    <div class="bg-anti-flash-white text-celadon-green">
      <div class="container mx-auto w-3/5">
        <nav class="flex items-center justify-between flex-wrap p-6">
          <div class="flex items-center flex-shrink-0 mr-6">
            <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span class="font-semibold text-xl tracking-tight">Stock Tracker</span>
          </div>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow" >
              <router-link
                to="/"
                class="block mt-4 lg:inline-block lg:mt-0 hover:text-sea-serpent mr-4"
                exact
                >Home</router-link>
              <router-link
                to="/portfolio"
                class="block mt-4 lg:inline-block lg:mt-0 hover:text-sea-serpent mr-4"
                >Portfolio</router-link>
              <router-link
                to="/invest"
                class="block mt-4 lg:inline-block lg:mt-0 hover:text-sea-serpent mr-4"
                >Invest</router-link>
            </div>
            <div>
              <span class="text-xs mr-5">Day {{ currentDay }}</span>
              <button
                v-on:click="incrementDay"
                class="inline-block text-sm px-4 py-2 leading-none border rounded border-verdigris hover:border-transparent hover:text-teal-500 hover:bg-anti-flash-white mt-4 lg:mt-0">Next Day</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    currentDay: function () {
      return this.$store.getters.getCurrentDay
    }
  },
  methods: {
    incrementDay: function () {
      this.$store.dispatch('incrementDay')
    }
  }
}
</script>

<style scoped>

.router-link-exact-active {
  font-weight: bolder;
}

</style>
