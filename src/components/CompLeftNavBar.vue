<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="
          drawer = !drawer;
          mini = !mini;
        "
      ></v-app-bar-nav-icon>
      <v-toolbar-title>LHU Lookup Management</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
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
    mini: true,
  }),
  methods: {
    logout() {
      // xóa cookies và đăng xuất về trang login
      this.$cookies.remove("cookToken");
      this.$router.replace("/login");
    },
  },
};
</script>
<style>
.main-content {
  padding: 0px !important;
}
.v-application--wrap {
  min-height: 0px;
}
</style>
