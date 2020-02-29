<template>
  <div id="app" class="antialiased">
    <Header></Header>
    <div class="container w-3/5 mx-auto px-6">
      <main>
        <transition name="view" mode="out-in">
          <router-view/>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {

  data () {
    return {
    }
  },

  watch: {

  },

  components: {
    Header
  },

  created: function () {
    this.$store.dispatch('init')
  }

}
</script>

<style>
body {
    /* Smooth out the fonts */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Set the background colour */
    background-color: theme('colors.mint-cream');

    /* Set the default text colour */
    color: theme('colors.gray.700');
}

.view-enter-active, .view-leave-active {
  transition: all 0.2s ease-in;
  transform: 0.2s ease;

}

/* Annimation start state */
.view-enter, .view-leave-to {
  opacity: 0;
  transform: translateY(-30px);

}

/* Final state */
.view-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.view-leave {
  opacity: 1;
  transform: translateY(0px);
}

.view-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
