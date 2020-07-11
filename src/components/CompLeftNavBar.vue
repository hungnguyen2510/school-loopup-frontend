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
            <v-list-item-title>
              <router-link class="linkMenu" to="/management/group"
                >Danh sách nhóm ngành
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="linkMenu" to="/management/industry"
                >Danh sách ngành
              </router-link></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-content">
      <v-container>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
    </v-main>

    <v-footer app color="primary" class="white--text">
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <v-btn v-on:click="logout">Đăng xuất</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "comp-leftnavbar",
  props: {
    source: String,
    tokenAuth: String,
  },
  data: () => ({
    drawer: null,
    selectTab: 0,
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
    },
  },
};
</script>
<style>
.main-content {
  padding: 0px !important;
}
</style>
