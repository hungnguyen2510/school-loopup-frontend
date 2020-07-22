<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="txtSearch"
          label="Tìm kiếm ngành nghề bạn muốn"
          outlined
          dense
        ></v-text-field>
        <v-row justify="center">
          <v-btn v-on:click="Search" large color="primary">Tìm kiếm</v-btn>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <tags-ball
            v-on:changeTxtSearch="handleSearch"
            :width="800"
            :height="400"
            :tags="tags"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TagsBall from "./TagsBall";

export default {
  name: "comp-search",
  data() {
    return {
      tags: [],
      txtSearch: "",
    };
  },
  components: { "tags-ball": TagsBall },
  // beforeCreate() {},
  methods: {
    handleSearch(data) {
      this.txtSearch = data;
      // console.log("changeTxtSearch", this.txtSearch);
      this.Search();
    },
    Search() {
      console.log("search: ", this.txtSearch);
    },
    //   getData() {
    //     axios
    //       .get("https://api.trongnc.com:3001/group", {
    //         headers: {
    //           Authorization: "Bearer " + this.$cookies.get("cookToken"),
    //         },
    //       })
    //       .then((response) => {
    //         this.tags = response.data;
    //         // console.log(this.$cookies.get("cookToken"));
    //         // console.log(this.groups);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   },
  },
};
</script>

<style>
.tabClou {
  width: 100%;
  padding-left: 25%;
  padding-right: 25%;
  position: absolute;
}
.main {
  padding: 15% 0 0;
  position: relative;
  padding-left: 25%;
  padding-right: 25%;
  /* display: flex; */
}
</style>
