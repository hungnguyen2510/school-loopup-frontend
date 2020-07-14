<template>
  <v-app id="inspire">
    <CompLeftNavBar></CompLeftNavBar>
    <v-main class="main-content">
      <v-container> </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CompLeftNavBar from "./CompLeftNavBar";
export default {
  name: "comp-management",
  components: {
    CompLeftNavBar,
  },
  data: () => ({}),
  methods: {},
};
</script>
<style>
.main-content {
  padding: 0px !important;
}
</style>
