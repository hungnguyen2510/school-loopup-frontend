<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-main>
      <!-- <CompSearcher></CompSearcher> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import CompSearcher from "./components/CompSearch";
export default {
  name: "App",

  components: {
    // CompSearcher
  },

  data: () => ({}),
  methods: {}
};
</script>
