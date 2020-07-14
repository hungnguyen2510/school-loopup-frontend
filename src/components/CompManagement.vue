<template>
  <v-app id="inspire">
    <CompLeftNavBar></CompLeftNavBar>
    <v-main class="main-content">
      <v-container>
        <tags-ball :width="400" :height="400" :tags="tags" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CompLeftNavBar from "./CompLeftNavBar";
import TagsBall from "./TagsBall";
export default {
  name: "comp-management",
  components: {
    CompLeftNavBar,
    "tags-ball": TagsBall,
  },
  data: () => ({
    tags: ["html", "test2", "test3", "test4", "test5", "test6"],
  }),
  methods: {},
};
</script>
<style>
.main-content {
  padding: 0px !important;
}
</style>
