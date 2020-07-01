<template>
  <div class="main">
    <v-flex justify-center>
      <v-text-field label="Tìm kiếm ngành nghề bạn muốn" outlined dense></v-text-field>
      <v-btn large color="primary">Tìm kiếm</v-btn>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "comp-search",
  data() {
    return {};
  }
};
</script>

<style>
.main {
  margin: 20% 0px;
  padding-left: 25%;
  padding-right: 25%;
  /* display: flex; */
}
</style>