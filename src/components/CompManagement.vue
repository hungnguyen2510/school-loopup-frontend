<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>LHU Lookup Management</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-on:click="changeTab(0)">Danh sách nhóm ngành</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-on:click="changeTab(1)">Danh sách ngành</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-content">
      <v-container>
        <CompNhomNganh v-if="selectTab == 0"></CompNhomNganh>
        <CompNganh v-if="selectTab == 1"></CompNganh>
      </v-container>
    </v-main>

    <!-- <v-navigation-drawer v-model="right" fixed right temporary></v-navigation-drawer> -->

    <v-footer app color="primary" class="white--text">
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <v-btn v-on:click="logout">Đăng xuất</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import CompNhomNganh from "./CompNhomNganh";
import CompNganh from "./CompNganh";
export default {
  name: "comp-management",
  props: {
    source: String,
    tokenAuth: String
  },
  components: { CompNhomNganh, CompNganh },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    selectTab: 0
  }),
  methods: {
    logout() {
      // xóa cookies và đăng xuất về trang login
      this.$cookies.remove("cookToken");
      this.$router.replace("/login");
    },
    changeTab(tabs) {
      this.selectTab = tabs;
      // console.log(tabs);
    }
  }
};
</script>
<style>
.main-content {
  padding: 0px !important;
}
</style>